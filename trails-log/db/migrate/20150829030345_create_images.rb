class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :title
      t.string :caption
      t.string :src
      t.references :trail

      t.timestamps null: false
    end
  end
end
