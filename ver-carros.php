<?php
require_once 'conexao.php';

$sql = "SELECT id, nome_vendedor, nome_carro, ano_carro, marca, ativo FROM carros";
$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();
$carros = $result->fetch_all(MYSQLI_ASSOC);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Carros Disponíveis</title>
    <?php $base = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\'); ?>
    <link rel="stylesheet" href="<?= $base ?>/src/CSS/pages/ver-carros.css">
</head>
<body>

<header>
    <a href="index.html">
        <img src="<?= $base ?>/assets/images/logos/Ayrton_Senna_Branco_logo_horizontal.png" alt="">
    </a>
</header>

<div class="container-lista">
    <h1>Carros Cadastrados</h1>

    <?php if (count($carros) === 0): ?>
        <p>Nenhum carro encontrado.</p>
    <?php else: ?>
        <ul>
            <?php foreach ($carros as $carro): ?>
                <li>
                    — Carro: <strong><?= htmlspecialchars($carro['nome_carro']) ?></strong>
                    — Vendedor: <?= htmlspecialchars($carro['nome_vendedor']) ?>
                    — Marca: <?= htmlspecialchars($carro['marca']) ?>
                    — Ano: <?= htmlspecialchars($carro['ano_carro']) ?>

                    <?php if ($carro['ativo'] == 0): ?>
                        <span class="desativado">[DESATIVADO]</span>
                    <?php endif; ?>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>
</div>

</body>
</html>
