class Address < ApplicationRecord
  belongs_to :property

#   SELECT DISTINCT city, STRING_AGG(CAST(price AS VARCHAR),',' ORDER BY price DESC) as prices
# FROM addresses a
# INNER JOIN properties p ON p.id = a.property_id
# WHERE p.sold is TRUE
# GROUP BY city

  def self.cost_by_city
    select("DISTINCT city,
            STRING_AGG(CAST(price AS VARCHAR), ', ' ORDER BY price DESC) AS prices,
            COUNT(*) price")
    .joins('INNER JOIN properties p ON addresses.property_id = p.id')
    .where('p.sold IS TRUE')
    .group('city')
  end
  
end
