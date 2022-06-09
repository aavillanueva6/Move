const User = require('./User');
const Post = require('./post');
const Comment = require('./comment');
const Category = require('./category');
const Message = require('./messages');
<<<<<<< HEAD

=======
>>>>>>> a83a11e (adding assets)

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
<<<<<<< HEAD

=======
>>>>>>> a83a11e (adding assets)
});

User.hasMany(Message, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

Message.belongsTo(User, {
  foreignKey: 'user_id',

});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

Category.hasMany(Post, {
  foreignKey: 'category_id',
  onDelete: 'SET NULL',
});

Post.belongsTo(Category, {
  foreignKey: 'category_id',
});


module.exports = { User, Post, Comment, Category, Message };

