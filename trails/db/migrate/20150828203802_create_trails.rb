class CreateTrails < ActiveRecord::Migration
  def change
    create_table :trails do |t|
    	t.string :title
    	t.string :length
    	t.string :duration
    	t.string :difficulty
    	t.integer :rating
    	t.references :user
    	t.references :map 
    	
      t.timestamps null: false
    end
  end
end
