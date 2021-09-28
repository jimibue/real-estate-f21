class Buyer < ApplicationRecord
  belongs_to :agent
  # this take our text data from db
  # converts to Array
  serialize :cities, Array
end
