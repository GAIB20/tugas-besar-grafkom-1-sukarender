# tugas-besar-grafkom-1-sukarender
program berkakas WebGL untuk membuat program sederhana yang memiliki fungsionalitas untuk menggambar model - model geometri dan pengaplikasian beberapa modifikasi terhadap model tersebut. Untuk pembangunan program tidak menggunakan library eksternal melainkan dengan cara pengimplementasian fungsi-fungsi yang dibutuhkan dan tidak terdapat pada WebGL secara manual.

Model geometri yang terdapat pada program ini adalah garis, persegi, persegi panjang, dan poligon. Untuk modifikasi yang terdapat di program ini adalah transformasi geometri ( translasi, rotasi, dilatasi), menggerakkan salah satu vertex dari suatu model, dan juga melakukan perubahan warna pada vertex  yang dipilih.

Selain itu, program ini memiliki fitur save dan load yang berfungsi untuk menyimpan  model hasil pengerjaan yang telah kita buat dan juga memuat kembali model yang telah kita buat

## Anggota Kelompok
|NIM       | Nama                   |
|----------|------------------------|
|13521001  | Angger Ilham A.         |
|13521014  | Muhhamad Syauqi J.         |
|13521022  | Raditya Naufal A.        |

## Panduan Penggunaan
Manual penggunaan program
- Cara menjalankan program
  - Clone repository ini
  - Buka folder repo ini
  - Double click pada src/index.html

  
- Cara menggambar
  - Klik button shapes yang diinginkan
  - Untuk line, square, dan rectangle, click and drag untuk menggambar shapes, jika sudah tinggal lepas clicknya dan gambar akan terbentuk.
  - Untuk polygon, klik pada canvas untuk menambahkan titik, jika sudah terdapat lebih dari 2 titik maka bentuk polygon akan mulai terbentuk. Untuk menghentikan pembuatan polygon bisa dilakukan dengan cara memilih shape lagi.


- Cara edit
  - Pilih shapes atau sudut yang ingin diedit
  - Pilih fitur edit yang diinginkan

  
### Beberapa fitur edit yang dapat dipilih

Color : Pertama pilih warna yang ingin diimplementasikan dengan cara mengklik bagian color. Penggantian warna berdasarkan vertex mana saja yang dipilih untuk diubah warnanya.

Translasi : Terdapat 2 kemungkinan ketika menggunakan Translasi, yaitu ketika hanya memilih 1 vertex maka akan melakukan translasi pada 1 vertex pada shape tersebut.
Akan tetapi, jika memilih lebih dari 1 vertex maka akan dianggap untuk melakukan translasi keseluruhan shape tersebut.
Translasi diwakilkan oleh slider Scale X dan slider Scale Y

Rotasi : Untuk rotasi berapapun vertex yang dipilih pada suatu shape aka ndilakukan rotasi untuk keseluruhan shape tersebut.
Rotasi diwakilkan oleh slider Rotation

Dilatasi : Untuk dilatasi berapapun vertex yang dipilih pada suatu shape akan dilakukan dilatasi untuk keseluruhan shape tersebut. Dilatasi mengubah ukuran shape baik memperkecil maupun memperbesar
Dilatasi diwakilkan oleh slider Dilatation

Save : Save akan mengunduh project yang kita buat tadi dalam bentuk file .json

Load : Load digunakan untuk memuat project yang kita save sebelumnya.

Delete Selected Object: button ini digunakan untuk menghapus semua object yang sedang dipilih.

Mengatur Layer : Untuk Mengatur Layer ini terdapat pada bagian Model List (pada bagian kiri). Terdapat panah atas dan panah bawah, untuk mengubah posisi layer jika terdapat 2 shapes yang saling bertumpukan dan bisa diatur mana yg posisinya lebih tinggi dan lebih rendah. 

