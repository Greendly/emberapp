import Ember from 'ember';

export default Ember.Controller.extend({
  init: function(){  
  },
  
    actions: {
      // save a category record to our offline datastore 
      add: function() {
        var selCat = this.get('selectedCategory');
        
        if(selCat !== undefined){
          var subCat = this.store.createRecord('category',{
              name: this.get('newCategoryName')
          });
          subCat.save();       
          selCat.get('subCategory').pushObject(subCat);
          
        }else{
          var category = this.store.createRecord('category', {
            name: this.get('newCategoryName')
          });
          category.save();
        }
        
      },        
      // delete a category record from our offline datastore 
      remove: function(category) {
        category.destroyRecord();
      }
    }
});
