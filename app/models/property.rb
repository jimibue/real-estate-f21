class Property < ApplicationRecord
  belongs_to :agent
  has_one :address

  # SELECT p.id, p.beds, p.baths, p.sq_ft, p.agent_id, p.price,  a.email, a.first_name, a.last_name, ad.city, ad.zip, ad.street
  # FROM properties AS p
  # INNER JOIN agents AS a ON a.id = p.agent_id
  # INNEr JOIN addresses AS ad ON ad.property_id = p.id
  # WHERE p.sold <> TRUE
# ORDER by a.id
  def self.available
    select('p.id, p.beds, p.baths, p.sq_ft, p.agent_id, p.price,  a.email, a.first_name, a.last_name, ad.city, ad.zip, ad.street')
    .from('properties AS p')
    .joins(
      'INNER JOIN agents AS a ON a.id = p.agent_id
      INNER JOIN addresses AS ad ON ad.property_id = p.id'
    )
    .where('p.sold <> TRUE')
    .order('a.id')
  end 

#   -- SELECT DISTINCT city 
# -- FROM addresses

  def self.cities
    select("DISTINCT city")
    .from('addresses')
  end

#   SELECT p.price, p.beds, p.baths, p.sq_ft
# FROM properties AS p
# INNER JOIN addresses AS a ON a.property_id = p.id
# WHERE LOWER(a.city) = 'slc' AND p.sold <> TRUE
  def self.by_city(city)
   select(' p.price, p.beds, p.baths, p.sq_ft')
   .from('properties AS p')
   .joins('INNER JOIN addresses AS a ON a.property_id = p.id')
   .where("LOWER(a.city) = ? AND p.sold <> TRUE", city.lower)
  end
end
