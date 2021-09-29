class Agent < ApplicationRecord
  has_many :properties
  has_many :buyers


#   SELECT agents.id, agents.first_name, agents.last_name, p.sold, COUNT(*) AS frequency
# FROM agents
# INNER JOIN properties p ON p.agent_id = agents.id
# WHERE SOLD <> true
# GROUP BY agents.id, agents.first_name, agents.last_name, p.sold
# ORDER BY COUNT(*) DESC
def self.unsold_homes
    select('agents.id, agents.first_name, agents.last_name, p.sold, COUNT(*) AS unsold_homes')
    .from('agents')
    .joins('INNER JOIN properties p ON p.agent_id = agents.id')
    .where('sold <> true')
    .group('agents.id, agents.first_name, agents.last_name, p.sold')
    .order('unsold_homes  DESC')
  end
end
