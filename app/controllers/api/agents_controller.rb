class Api::AgentsController < ApplicationController

  def index
   render json: Agent.unsold_homes
  end

  # bonus try as custom SQL
  def show
    render json: Agent.find(params[:id]).buyers
  end
end
