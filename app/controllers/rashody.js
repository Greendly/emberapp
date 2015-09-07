import Ember from 'ember';

export default Ember.Controller.extend({
  init: function(){ 
  },
  
  actions: {
      /* save a category record to our offline datastore */
     add: function() {
        var rashody = this.store.createRecord('rashody', {
          date: moment(this.get('newDate'),"DD.MM.YYYY").unix(),
          count: this.get('newCount'),
          category: this.get('selectedCategory')
        });
        rashody.save();
      },        
      /* delete a category record from our offline datastore */
      remove: function(rashody) {
        rashody.destroyRecord();
      },
        
      setFilterType: function(ft){
        this.set('filterType',ft);
      },
      setChartType: function(ct){
        this.set('chartType',ct);
      }
  },
  filterType: 'All',
  chartType:'details',
  
  filteredResults: function(){
    var filterType = this.get('filterType');
    var fromDate = moment(this.get('fromDate'),"DD.MM.YYYY").unix();
    var beforeDate =moment(this.get('beforeDate'),"DD.MM.YYYY").unix();
    
    var thisDay = moment().unix();
    switch (filterType){ 
      case 'All':
         return this.store.findAll('rashody');
      case 'lastDay':
        return this.store.filter('rashody',function(rashod){
           return (thisDay - rashod.get('date')) < 86400 ; //one day                                       
        });
      case 'lastWeek':
        return this.store.filter('rashody',function(rashod){
           return (thisDay - rashod.get('date')) < 604800 ; //one week                                       
        });
      case 'lastMonth':
        return this.store.filter('rashody',function(rashod){
           return (thisDay - rashod.get('date')) < 2592000 ; //one week                                       
        });
      case 'between':
        return this.store.filter('rashody',function(rashod){
           return (rashod.get('date') >= fromDate)&&(rashod.get('date') <= beforeDate) ;                                        
        });
    }
  }.property('filterType','fromDate','beforeDate'),
  
  
  filteredResultsForPieChart: function(){
    var filteredResults = this.get('filteredResults');
    var chartType = this.get('chartType');
    var rgb_r, rgb_g, rgb_b;
    var data = [];

    switch(chartType){
      
      case 'general':
        filteredResults.forEach(function(item){
          
          if (!item.get('category.parentCategory')){
            rgb_r = rndInt(0,245); rgb_g = rndInt(0,245); rgb_b = rndInt(0,245);
            data.pushObject({
              value: item.get('category.subcatRashCount'), 
              color: 'rgb('+rgb_r+','+rgb_g+','+rgb_b+')', 
              highlight: 'rgb('+(rgb_r+10)+','+(rgb_g+10)+','+(rgb_b+10)+')', 
              label: item.get('category.name')
            });
          }
          
        });
        break;
      
      case 'details':
        filteredResults.forEach(function(item){
          
          rgb_r = rndInt(0,245); rgb_g = rndInt(0,245); rgb_b = rndInt(0,245);
          data.pushObject({
            value: item.get('category.rashCount'), 
            color: 'rgb('+rgb_r+','+rgb_g+','+rgb_b+')', 
            highlight: 'rgb('+(rgb_r+10)+','+(rgb_g+10)+','+(rgb_b+10)+')', 
            label: item.get('category.name')
          });
          
        });
        break;
    }
    
    
    function rndInt(min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    }
       
    return data;
  }.property('filteredResults.@each','chartType'),
  
  PieChartOptions: {
    animationEasing : "linear"
  }
  
});
