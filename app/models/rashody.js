import DS from 'ember-data';

export default DS.Model.extend({
    category: DS.belongsTo('category', { async: true }),
    date: DS.attr('number'), //Unix Timestamp (seconds)
    count: DS.attr('number')
});
