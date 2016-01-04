class BookingsController < ApplicationController
  before_action :set_booking, only: [:show, :update, :destroy]

  # GET /bookings
  # GET /bookings.json
  def index
    @bookings = Booking.all

    render json: @bookings
  end

  # GET /bookings/1
  # GET /bookings/1.json
  def show
    render json: @booking
  end

  def new
    @booking = Booking.new
  end

  # POST /bookings
  # POST /bookings.json
  def create
    @booking = Booking.new(booking_params)
#    @booking.user_id = params[:booking][:user_id]
    if @booking.save
      redirect_to unlok_air_path(params[:booking][:item_id])
    else
      render :new
    end
  end

  # PATCH/PUT /bookings/1
  # PATCH/PUT /bookings/1.json
  def update
    @booking = Booking.find(params[:id])

    if @booking.update(booking_params)
      head :no_content
    else
      render json: @booking.errors, status: :unprocessable_entity
    end
  end

  # DELETE /bookings/1
  # DELETE /bookings/1.json
  def destroy
    @booking.destroy

    head :no_content
  end

  private

    def set_booking
      @booking = Booking.find(params[:id])
    end

    def booking_params
      params.require(:booking).permit(:name, :type, :flight_type, :from_place, :to_place, :date_of_journey, :noofpassengers, :from_location, :to_location, :user_id, :aircraft_type, :trip_type, :oneway_trip, :item_id).merge(user_id: params[:booking][:user_id])
    end
end
