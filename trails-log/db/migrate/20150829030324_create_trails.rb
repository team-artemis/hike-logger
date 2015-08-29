class CreateTrails < ActiveRecord::Migration
  def change
    create_table :trails do |t|
      t.string :title
      t.string :length
      t.string :duration
      t.string :difficulty
      t.string :review
      t.integer :rating
      t.string  :trailhead, array: true
      t.string  :trailend, array: true
      t.references :user
      t.references :map

      t.timestamps null: false
    end
  end
end
