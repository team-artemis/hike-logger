class CreateTrails < ActiveRecord::Migration
  def change
    create_table :trails do |t|
      t.string :title
      t.string :length
      t.string :duration
      t.string :difficulty
      t.string :review
      t.integer :rating
      t.float  :trailhead_lon
      t.float  :trailhead_lat
      t.float  :trailend_lon
      t.float  :trailend_lat
      t.references :user
      t.references :map

      t.timestamps null: false
    end
  end
end
