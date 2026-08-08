<?php 
    require './repositories/mysql/Database.php';
    require './models/Product.php';

class ProductController{
    private $productModel;

    public function __construct(){
        //Aca creo la base de datos para poner obtener el objeto inicial
        $database = new Database(); 

        //Crear la conexion con esa conexion ya puedo trabajar
        $db = $database->getConnection();

       $this->productModel = new Product($db);
    }

    public function read(){
      /* $products = [[
            'id'=>1,
            'nombre' => "Mouse",
            'cantidad' => 2,
            'descuento' => 5,
            'precio' => 150
        ]];*/
        $products = $this->productModel->getAll();
        /*
        print_r($products[0]);
        $unProducto = $products[0];
        print($unProducto['nombre']);
        print($products[2]['nombre']);*/
        include_once './views/home.php';
    }

    public function create(){
        //print_r($_POST);
        //print($_POST['nombre']);
        //print($_POST['precio']);
        //print($_POST['descuento']);
        //print($_POST['cantidad']);

        

        if( $_SERVER["REQUEST_METHOD"] === "POST"){
       
        $nombre = $_POST['nombre'];
        $precio = $_POST['precio'];
        $descuento = $_POST['descuento'];
        $cantidad = $_POST['cantidad'];

        $this->productModel->create($nombre,$precio,$descuento,$cantidad);
        header('Location: ./index.php?action=read');
        exit();
        }

        include_once './views/create.php';
    }

    public function update(){

        if (isset($_GET['id'])) {
        //print($_GET['id']);
        $id = $_GET['id'];

        //RETO: OBTENER EL PRODUCTO POR ID CON getById($id) y guardarlo en una variable
        $product = $this->productModel->getById($id);

        //print_r($product);
        
        }

        if( $_SERVER["REQUEST_METHOD"] === "POST"){

        $id =  $_POST['id'];
        //print($id);
        $nombre = $_POST['nombre'];
        //print($nombre);
        $precio = $_POST['precio'];
        //print($precio);
        $descuento = $_POST['descuento'];
        //print($descuento);
        $cantidad = $_POST['cantidad'];
        //print($cantidad);

        $this->productModel->update($id,$nombre,$precio,$descuento,$cantidad);
        header('Location: ./index.php?action=read');
        exit();
        }

        include_once './views/edit.php';
    }

    public function delete(){

        if (isset($_GET['id'])) {
        print($_GET['id']);
        $id = $_GET['id'];
            $this->productModel->delete($id);
            header('Location: ./index.php?action=read');
            exit();
        
        
        }

    }
}

?>
