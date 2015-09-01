class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :firstname
      t.string :lastname
      t.string :city
      t.string :state
      t.string :country
      t.string :password_digest
      t.string :email
      t.string :avatar_url

      t.timestamps null: false
    end
  end
end
