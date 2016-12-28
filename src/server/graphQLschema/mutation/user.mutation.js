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
  GraphQLInputObjectType
} from 'graphql';
import { PointObject } from 'graphql-geojson';

import mongoose from 'mongoose';

import jwtUtil from '../../util/jwt.util';
import User from '../type/user.type';

const UserModel = mongoose.model('User');

const UserMutation = {
  createUser: {
    type: User,
    description: 'Create a new user and get accessToken.',
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: (source, args, _) => (
      new Promise((resolve, reject) => {
        UserModel.create(args)
          .then((user)=> {
            user.accessToken = jwtUtil.createAccessToken(user);
            resolve(user);
          })
          .catch((err)=> {
            reject(err.message);
          });
      })
    ),
  },
  getToken: {
    type: User,
    description: 'Sign in and get accessToken.',
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: (source, { email, password }, _) => (
      new Promise((resolve, reject) => {
        UserModel.findOne({ email: email })
          .then((user)=> {
            if (user) {
              user.comparePassword(password, (err, isMatch) => {
                if (isMatch) {
                  user.accessToken = jwtUtil.createAccessToken(user);
                  return resolve(user);
                }

                return reject('Wrong password.');
              });

            } else {
              reject('Not registered.');
            }
          })
          .catch((err)=> {
            reject(err.message);
          });
      })
    ),
  },
  //requestCheckPhone:{},
  //validiatePhone:{},
  updatePoint: {
    type: GraphQLString,
    description: 'Update position.',
    args: {
      lon: { type: new GraphQLNonNull(GraphQLFloat) },
      lat: { type: new GraphQLNonNull(GraphQLFloat) },
    },
    resolve: (source, args) => (
      new Promise((resolve, reject) => {
        UserModel.create(args)
          .then((user)=> {
            user.accessToken = jwtUtil.createAccessToken(user);
            resolve(user);
          })
          .catch((err)=> {
            reject(err.message);
          });
      })
    ),
  },
};

export default UserMutation;