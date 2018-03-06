/*
 * Copyright (C) 2015-2017, metaphacts GmbH
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, you can receive a copy
 * of the GNU Lesser General Public License from http://www.gnu.org/
 */

import { SparqlUtil } from 'platform/api/sparql';
import { SEMANTIC_SEARCH_VARIABLES, FACET_VARIABLES, Patterns } from './SearchConfig';

export const DefaultInlineProfile = '<http://metaphacts.com/semantic-search/dummyInlineDefaultProfile>';

export const DefaultProfile =
  '<http://www.metaphacts.com/ontologies/platform/semantic-search-profile/default-profile>';
export const DefaultSearchProfileCategoriesQuery = `
  PREFIX ssp: <http://www.metaphacts.com/ontologies/platform/semantic-search-profile/>
  PREFIX schema: <http://schema.org/>

  SELECT DISTINCT ?profile ?category ?label ?description ?thumbnail WHERE {
    {
      SELECT ?category ?label ?profile ?description ?thumbnail {
        ?profile ssp:hasCategory ?hasCategory.
        {
          ?hasCategory ssp:category ?category .
          ?category rdf:type ssp:Category ;
            rdfs:label ?label ;
            rdfs:label ?description ;
            schema:thumbnail ?thumbnail ;
            ssp:order ?order .
        } UNION {
          BIND(ssp:TextCategory AS ?category) .
          BIND("text search" AS ?label) .
          BIND("text search" AS ?description) .
          BIND("../images/fcs/keywords.svg" AS ?thumbnail) .
          BIND(10 AS ?order) .
        }
      }
    } UNION {
      SELECT ?profile ?category ?label ?description ?thumbnail {
        ?category rdf:type ssp:Category ;
          rdfs:label ?label ;
          rdfs:label ?description ;
          schema:thumbnail ?thumbnail ;
          ssp:order ?order .
        BIND(ssp:default-profile as ?profile) .
      }
    } UNION {
      BIND(ssp:TextCategory as ?category) .
      BIND("text search" as ?label) .
      BIND("text search" as ?description) .
      BIND("../images/fcs/keywords.svg" AS ?thumbnail) .
      BIND(10 AS ?order) .
      BIND(ssp:default-profile AS ?profile) .
    }
  }
  ORDER BY ?order
`;

export const DefaultSearchProfileRelationsQuery = `
  PREFIX ssp: <http://www.metaphacts.com/ontologies/platform/semantic-search-profile/>

  SELECT DISTINCT ?profile ?relation ?label ?description ?hasDomain ?hasRange ?order WHERE {
    {
      SELECT ?profile ?relation ?label ?hasDomain ?hasRange ?description ?orderLabel ?order {
        ?profile ssp:hasRelation/ssp:relation ?relation.
          ?relation rdfs:label ?label ;
          rdfs:label ?description ;
          ssp:hasDomain ?hasDomain ;
          ssp:hasRange ?hasRange .
        OPTIONAL { ?relation ssp:hasBroaderRelation ?broader }.
        BIND(IF(BOUND(?broader), CONCAT(STR(?broader), \"1\"), CONCAT(STR(?relation), \"0\")) AS ?orderLabel)
        BIND(IF(BOUND(?broader), 15, 0) AS ?order)
      }
    } UNION {
      SELECT ?profile ?relation ?label ?hasDomain ?hasRange ?description ?orderLabel ?order  {
        ?relation rdfs:label ?label ;
          rdfs:label ?description ;
          ssp:hasDomain ?hasDomain ;
          ssp:hasRange ?hasRange .
        BIND(ssp:default-profile as ?profile) .
        OPTIONAL { ?relation ssp:hasBroaderRelation ?broader }.
        BIND(IF(BOUND(?broader), CONCAT(STR(?broader), \"1\"), CONCAT(STR(?relation), \"0\")) AS ?orderLabel)
        BIND(IF(BOUND(?broader), 25, 0) AS ?order)
      }
    }
  }
  ORDER BY ?orderLabel ?label
`;

export function DefaultTextPattern(): Patterns {
  return {
  'http://www.metaphacts.com/ontologies/platform/semantic-search-profile/TextCategory': [
    {
      kind: 'text',
      queryPattern: `
           {
             $subject a ?__domain__ .
             $subject ${SparqlUtil.preferredLabelPattern()} ?label .
             SERVICE <http://www.bigdata.com/rdf/search#search> {
               ?label bds:search ?__value__ ;
                      bds:minRelevance "0.3" ;
                      bds:matchAllTerms "true"  .
             }
           }
      `,
    },
  ]};
}



export const CategoryViewTemplate = `
  <div style="display: flex; align-items: center;">
    {{#if thumbnail}}
      {{#ifCond thumbnail.length '>' 0}}
        <div class="semantic-search__class-selector-item">
          <img src="{{thumbnail}}" />
        </div>
      {{/ifCond}}
    {{/if}}
    <span>{{label}}</span>
  </div>
`;
export const RelationViewTemplate = `
  <div>
    {{label}}
  </div>
  `;
export const ResultLimit = 1000;

export namespace DefaultFacetValuesQueries {
  export function forResource() {
    return `
      SELECT ?value (COUNT(DISTINCT $subject) AS ?count) WHERE {
        FILTER(?${FACET_VARIABLES.RELATION_PATTERN_VAR})
      }
      GROUP BY ?value
      ORDER BY ?value
    `;
  }

  export function forLiteral() {
    return `
      SELECT ?literal (COUNT(DISTINCT $subject) AS ?count) WHERE {
        FILTER(?${FACET_VARIABLES.RELATION_PATTERN_VAR})
      }
      GROUP BY ?literal
      ORDER BY ?literal
    `;
  }

  export function forDateRange() {
    return `
      SELECT ?dateBeginValue ?dateEndValue WHERE {
        FILTER(?${FACET_VARIABLES.RELATION_PATTERN_VAR})
      } ORDER BY ?dateBeginValue
    `;
  }

  export const ResourceRelationPattern = `$subject ?${FACET_VARIABLES.RELATION_VAR} ?value`;
  export const LiteralRelationPattern = `$subject ?${FACET_VARIABLES.RELATION_VAR} ?literal`;
}

export const DefaultFacetValueTemplate = {
  'resource': '<span><mp-highlight highlight="{{highlight}}">{{label.value}}</mp-highlight> ({{count.value}})</span>',
  'literal': '<span><mp-highlight highlight="{{highlight}}">{{literal.value}}</mp-highlight> ({{count.value}})</span>',
}


export const DefaultFacetRelationTupleTemplate = `
 <div class="facet-relation__content" title="{{$relation.label.value}}">
   {{$relation.label.value}}
   {{#if $range.thumbnail}}
     {{#ifCond $range.thumbnail.value.length '>' 0}}
       <img class="facet__relation__content__category-image" src="{{$range.thumbnail.value}}"/>
     {{/ifCond}}
   {{/if}}
  </div>
`;

export const DefaultFacetCategoriesTupleTemplate = `
  {{#if $category.thumbnail}}
    {{#ifCond $category.thumbnail.value.length '>' 0}}
      <div class="category-item" style="background-image: url('{{$category.thumbnail.value}}')"></div>
    {{else}}
      <span>{{$category.label.value}}</span>
    {{/ifCond}}
  {{else}}
    <span>{{$category.label.value}}</span>
  {{/if}}
`;

export function DefaultResourceSelectorQuery() {
  return `
    prefix bds: <http://www.bigdata.com/rdf/search#>
    SELECT DISTINCT ?suggestion ?label WHERE {
      ?label bds:search ?__token__ ;
      bds:relevance ?score ;
      bds:minRelevance "0.5" ;
      bds:matchAllTerms "true"  .

      ?suggestion ${SparqlUtil.preferredLabelPattern()} ?label .
      FILTER(EXISTS {
        { FILTER(?${SEMANTIC_SEARCH_VARIABLES.RELATION_PATTERN_VAR}) }
      })
    } ORDER BY DESC(?score)  LIMIT 30
  `;
}
export const DefaultResourceSelectorRelationPattern =
  `?subject $${SEMANTIC_SEARCH_VARIABLES.RELATION_VAR} ?suggestion`;
export const DefaultResourceSelectorSuggestionTemplate =
  `<span title="{{label.value}}">{{label.value}}</span>`;
export const DefaultResourceSelectorNoSuggestionsTemplate =
  `<div class="suggestion-no-matches">no matches found</div>`;
