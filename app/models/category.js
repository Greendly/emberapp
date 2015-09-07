import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    rashody: DS.hasMany('rashody',{ async: true }),
  
    parentCategory: DS.belongsTo('category', {inverse: 'subCategory'}),
    subCategory: DS.hasMany('category', {inverse: 'parentCategory'}),
  
    //расходы по категории
    rashCount: function(){
      var val = 0;
      this.get('rashody').forEach(function(rashod){
        val += rashod.get('count');
      });
      return val;
    }.property('rashody.@each.count'),
  
    // расходы по категории и дочерним категориям
    subcatRashCount: function(){
      var subVal =0;
      this.get('subCategory').forEach(function(subCat){
        subVal += subCat.get('subcatRashCount');
      });
      return subVal+ this.get('rashCount');
    }.property('subCategory.@each.subcatRashCount', 'rashCount')
   
});