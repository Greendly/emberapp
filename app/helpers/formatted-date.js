import Ember from 'ember';

export function formattedDate(params/*, hash*/) {
  return moment.unix(params).format("DD.MM.YY") ;
}

export default Ember.Helper.helper(formattedDate);
