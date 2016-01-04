class UnlokAirController < ApplicationController
  def index
    if params[:category].eql?('aircrafts')
      aircrafts_category = ItemCategory.find_by(name: 'aircrafts')
      @items = aircrafts_category.items.all
    else
      helicoptor_category = ItemCategory.find_by(name: 'helicoptor')
      @items = helicoptor_category.items.all  
    end
  end
  def show
    @item = Item.find_by(id: params[:id])
  end
end
