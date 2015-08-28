class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
    	t.string :firstname
    	t.string :lastname
    	t.string :email
    	t.string :password
    	t.string :city
    	t.string :state
    	t.string :country

      t.timestamps null: false
    end
  end
end
