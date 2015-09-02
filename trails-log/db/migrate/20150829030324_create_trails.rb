class CreateTrails < ActiveRecord::Migration
  def change
    create_table :trails do |t|
      t.string :title
      t.float :length
      t.string :duration
      t.string :difficulty
      t.string :review
      t.integer :rating
      t.boolean :is_loop
      t.string :trailhead_title
      t.decimal  :trailhead_lon
      t.decimal  :trailhead_lat
      t.decimal  :trailend_lon
      t.decimal  :trailend_lat
      t.string  :waypoints
      t.string  :images, array: true
      t.references :user
      t.references :map

      t.timestamps null: false
    end
  end
end
