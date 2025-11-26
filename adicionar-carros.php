<?php
include("conexao.php");

$nome_vendedor = $_POST['nome-vendedor'];
$marca = $_POST['marcas'];
$nome_carro = $_POST['nome-carro'];
$ano_carro = $_POST['ano-carro'];

// Capturar acessórios selecionados
$acessorios_array = isset($_POST['acessorios-carro']) ? $_POST['acessorios-carro'] : array();
$acessorios = implode(", ", $acessorios_array);

$foto_nome = null;

// FOTO OPCIONAL
if (isset($_FILES['foto-carro']) && $_FILES['foto-carro']['error'] == 0) {
    
    $pasta = "uploads/";

    if (!is_dir($pasta)) {
        mkdir($pasta, 0777, true);
    }

    $arquivo = basename($_FILES["foto-carro"]["name"]);
    $foto_nome = $pasta . $arquivo;

    move_uploaded_file($_FILES["foto-carro"]["tmp_name"], $foto_nome);
}

// INSERIR NO BANCO
$sql = "INSERT INTO carros (nome_vendedor, marca, nome_carro, ano_carro, acessorios, foto)
        VALUES ('$nome_vendedor', '$marca', '$nome_carro', '$ano_carro', '$acessorios', '$foto_nome')";

if ($conn->query($sql) === TRUE) {
    echo "Carro cadastrado com sucesso!";
} else {
    echo "Erro ao cadastrar: " . $conn->error;
}

$conn->close();
?>
