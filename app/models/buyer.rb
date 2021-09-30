class Buyer < ApplicationRecord
  belongs_to :agent
  # this take our text data from db
  # converts to Array
  serialize :cities, Array

#   SELECT p.id, price, city, sq_ft, cities, max_price, buyers.id AS buyers_id, a.first_name AS agent_first_name , buyers.first_name AS buyer_first_name 
# FROM buyers
# INNER JOIN agents a ON a.id = buyers.agent_id
# INNER JOIN properties p ON p.agent_id = a.id AND p.price < buyers.max_price
# INNER JOIN addresses ad ON p.id = ad.property_id AND city = ANY ('{"SLC"}')
# WHERE buyers.id = 56 AND p.sold <> TRUE;


  # class method (called on class)

  def self.my_homes(id, cities)
     select('p.id, price, city, sq_ft, cities, max_price, buyers.id AS buyers_id, a.first_name AS agent_first_name , buyers.first_name AS buyer_first_name')
     .from('buyers')
     .joins("INNER JOIN agents a ON a.id = buyers.agent_id
      INNER JOIN properties p ON p.agent_id = a.id AND p.price < buyers.max_price
      INNER JOIN addresses ad ON p.id = ad.property_id AND city = ANY ('{#{cities.join(',')}}')")
      .where('buyers.id = ? AND p.sold <> TRUE', id)
  end

  # static keyword sbefore method in js is declaring it a class method


  # instance method (called on instance of the class)
  # self refering to the instacne calling the method
  # in js an other langauge is this
  def my_homes
    {id: self.id, cities: self.cities, type:'instance'}
  end
end
