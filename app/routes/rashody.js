import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
      return Ember.RSVP.hash({
          rashody: this.store.findAll('rashody'),
          category:this.store.findAll('category')
      });
  }

});
