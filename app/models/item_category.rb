class ItemCategory < ActiveRecord::Base
  has_many :items, :dependent => :destroy
  has_many :sub_categories, :class_name => 'ItemCategory', :foreign_key => 'parent_category_id'
  belongs_to :parent_category, :class_name => 'ItemCategory'
  validates :name, presence: true
end
