import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLInterfaceType,
  GraphQLBoolean,
} from 'graphql';
import { PointObject } from 'graphql-geojson';
import User from './user.type';

import GraphQLDate from 'graphql-date';

const Point = new GraphQLObjectType({
  name: 'Point',
  description: 'UserType of Pingsters',
  fields: () => ({
    _id: { type: GraphQLString },
    updatedAt: { type: GraphQLDate },
    user: {
      type: User,
      resolve: (source) => {
        console.log(source);
      },
    },
    point: {
      type: PointObject,
      resolve: (source) => ({
        type: 'point',
        coordinates: source.point,
      }),
    },
  }),
});

export default Point;
