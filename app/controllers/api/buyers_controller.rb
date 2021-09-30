class Api::BuyersController < ApplicationController

  def show
  
    buyer = Buyer.find(params[:id])
    # my_homes is a class method
    render json: Buyer.my_homes(buyer.id, buyer.cities)
    
    # as a instance method, not passing anything
    # render json: buyer.my_homes
  end
end
