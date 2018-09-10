import * as Sequelize from 'sequelize';
import { sequelize } from '../../database';
import { Category } from '../categories/model';
import { Course } from '../courses/model';

export const ATTACHMENT_URL = 'URL';
export const ATTACHMENT_FILE = 'FILE';

const ATTACHMENT_TYPES = [ATTACHMENT_URL, ATTACHMENT_FILE];

export const Post = sequelize.define('post', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,
      allowEmpty: true
    }
  },
  attachmentType: {
    type: Sequelize.ENUM,
    values: ATTACHMENT_TYPES,
    allowNull: false
  },
  attachmentInfo: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      allowEmpty: false
    }
  }
}, {
  underscored: true
});

Post.hasOne(Category);
Post.belongsToMany(Course, {
  through: 'course_posts'
});
