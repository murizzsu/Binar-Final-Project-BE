# SecondHand (Backend)

SecondHand merupakan platform/tempat jual-beli barang secara online, khususnya barang bekas. Platform ini membuka dan
menyediakan berbagai jenis kategori kebutuhan. User yang mendaftarkan diri pada aplikasi ini dapat berperan sebagai
seller dan buyer dengan menggunakan 1 (satu) akun yang sama. Platform ini akan mempertemukan seller dan buyer
untuk dapat melakukan negosiasi barang dan melakukan transaksi langsung diluar platform.

# Credential Login

```
email = rizky@gmail.com
password = 12345
```

# How to run

## guide 

To run the server, run:

```
npm start or yarn start
```

To view the Swagger UI interface:

```
open https://secondhand-2-binar-final.herokuapp.com/docs
```

# Endpoints

## Users
POST("/api/v1/login") : untuk login bagi user <br>
POST("/api/v1/register") : untuk register bagi user <br>
POST("/api/v1/usersimageupload") : untuk upload image user <br>
PUT("/api/v1/profil") : untuk update profile bagi user <br>
GET("/api/v1/currentuser") : untuk melihat user saat ini <br>
GET("/api/v1/notification") : untuk mendapatkan notifikasi <br>
PUT("/api/v1/notification/:id") : untuk update status notifikasi <br>

## Products
GET("/api/v1/categories") : untuk mendapatkan semua kategori <br>
GET("/api/v1/products/wishlist") : untuk mendapatkan produk yang diminati <br>
POST("/api/v1/products") : untuk memposting produk <br>
POST("/api/v1/productsimageupload)) : untuk upload image produk <br>
GET("/api/v1/products") : untuk mendapatkan semua produk <br>
GET("/api/v1/products/:id") : untuk mendapatkan produk berdasarkan id <br>
PUT("/api/v1/products/:id") : untuk update produk berdasarkan id <br> 
PUT("/api/v1/products/:productId/status") : untuk update status produk berdasarkan id <br>
DELETE("/api/v1/products/:id") : untuk menghapus produk berdasarkan id <br>

## Bids
GET("/api/v1/products/:productId/bids") : untuk mendapatkan bids berdasarkan id produk <br>
POST("/api/v1/products/:productId/bids") : untuk membuat bids berdasarkan id produk <br>
GET("/api/v1/bids") : untuk mendapatkan semua bids <br>
POST("/api/v1/bids/check") : untuk mengecek jumlah bids <br>
PUT("/api/v1/bids/:bidsId") : untuk update status bids berdasarkan id bids <br>