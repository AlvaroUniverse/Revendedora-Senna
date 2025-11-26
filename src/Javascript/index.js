// ========================================
// GERENCIAMENTO DO MODAL DE ACESSÓRIOS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const modalAcessorios = document.getElementById('modal-acessorios');
    const btnAbrirModal = document.getElementById('btn-abrir-modal-acessorios');
    const btnFecharModal = document.getElementById('btn-fechar-modal');
    const btnFecharModalFooter = document.getElementById('btn-fechar-modal-footer');
    const btnAdicionarAcessorio = document.getElementById('btn-adicionar-acessorio');
    
    const inputNomeAcessorio = document.getElementById('novo-acessorio');
    const inputValorAcessorio = document.getElementById('valor-acessorio');
    const containerSelecionados = document.getElementById('acessorios-selecionados');

    // Função para abrir modal
    function abrirModal() {
        modalAcessorios.classList.add('ativo');
        document.body.style.overflow = 'hidden'; // Impede scroll do body
    }

    // Função para fechar modal
    function fecharModal() {
        modalAcessorios.classList.remove('ativo');
        document.body.style.overflow = 'auto'; // Restaura scroll do body
    }

    // Event listeners para abrir modal
    if (btnAbrirModal) {
        btnAbrirModal.addEventListener('click', abrirModal);
    }

    // Event listeners para fechar modal
    if (btnFecharModal) {
        btnFecharModal.addEventListener('click', fecharModal);
    }

    if (btnFecharModalFooter) {
        btnFecharModalFooter.addEventListener('click', fecharModal);
    }

    // Fechar modal ao clicar no overlay (fundo)
    if (modalAcessorios) {
        modalAcessorios.addEventListener('click', function(e) {
            if (e.target === modalAcessorios) {
                fecharModal();
            }
        });
    }

    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalAcessorios && modalAcessorios.classList.contains('ativo')) {
            fecharModal();
        }
    });

    // ========================================
    // GERENCIAMENTO DE ACESSÓRIOS
    // ========================================

    // Função para adicionar acessório
    function adicionarAcessorio() {
        const nome = inputNomeAcessorio.value.trim();
        // Validação: nome e valor
        const valor = inputValorAcessorio ? inputValorAcessorio.value.trim() : '';
        if (!nome) {
            alert('Por favor, insira o nome do acessório');
            inputNomeAcessorio.focus();
            return;
        }
        if (!valor || isNaN(parseFloat(valor))) {
            alert('Por favor, insira o valor do acessório (número)');
            if (inputValorAcessorio) inputValorAcessorio.focus();
            return;
        }

        // Criar checkbox no formulário principal com nome + valor
        criarCheckboxFormulario('acessorio-' + Date.now(), nome, parseFloat(valor));

        // Limpar formulário (campo nome e valor)
        inputNomeAcessorio.value = '';
        if (inputValorAcessorio) inputValorAcessorio.value = '';
        inputNomeAcessorio.focus();
    }

    // Função para criar elemento de acessório
    function criarElementoAcessorio(nome) {
        // Cria item simples no modal mostrando apenas o nome (sem checkbox nem botão de remover)
        const id = 'acessorio-' + Date.now();

        // Não inserimos mais itens no modal; apenas criamos o checkbox no formulário principal
        criarCheckboxFormulario(id, nome);
    }

    // Nota: Não exibimos mais um total na lista do formulário. O formulário apenas lista
    // checkboxes com nome e valor. Se quiser que o total seja mostrado em outro local,
    // podemos reativar essa função.

    // Cria o checkbox no formulário principal para um acessório disponível
    function criarCheckboxFormulario(id, nome, valor) {
        if (!containerSelecionados) return;

        // Remover placeholder de nenhum acessório
        const placeholder = containerSelecionados.querySelector('.acessorios-vazio');
        if (placeholder) placeholder.remove();

        const wrapper = document.createElement('div');
        wrapper.id = 'form-wrapper-' + id;
        wrapper.className = 'form-acessorio-wrapper';
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.gap = '10px';
        wrapper.style.padding = '8px 10px';
        wrapper.style.border = '1px solid var(--border-color)';
        wrapper.style.borderRadius = '8px';
        wrapper.style.background = 'white';
        wrapper.style.marginBottom = '8px';

    const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'acessorios-carro[]';
        input.value = nome;
        input.id = 'form-' + id;
    // sem valor/descricao (apenas nome)
        input.style.width = '18px';
        input.style.height = '18px';
        input.style.cursor = 'pointer';
    input.checked = false; // não marcar por padrão ao adicionar

    const label = document.createElement('label');
    label.htmlFor = input.id;
    label.style.display = 'flex';
    label.style.flexDirection = 'row';
    label.style.alignItems = 'center';
    label.style.gap = '8px';
    label.style.margin = '0';

    const nomeEl = document.createElement('span');
    nomeEl.textContent = nome;
    nomeEl.className = 'form-acessorio-nome';

    label.appendChild(nomeEl);

    if (typeof valor !== 'undefined' && valor !== null) {
        const valorEl = document.createElement('span');
        valorEl.textContent = `R$ ${parseFloat(valor).toFixed(2).replace('.', ',')}`;
        valorEl.className = 'form-acessorio-valor';
        label.appendChild(valorEl);
        // armazenar no checkbox para possível uso no backend ou cálculos
        input.dataset.valor = parseFloat(valor).toFixed(2);
    }

        wrapper.appendChild(input);
        wrapper.appendChild(label);

        // Ao marcar/desmarcar apenas atualizamos o estilo (nenhum total exibido)
        input.addEventListener('change', function() {
            wrapper.classList.toggle('selecionado', input.checked);
        });

        // Botão de remover aparece apenas na lista do formulário principal
        const btnRemoverForm = document.createElement('button');
        btnRemoverForm.type = 'button';
        btnRemoverForm.className = 'btn-remover-acessorio-form';
        btnRemoverForm.textContent = 'Remover';
        btnRemoverForm.style.marginLeft = 'auto';
        btnRemoverForm.style.padding = '6px 10px';
        btnRemoverForm.style.border = '1px solid var(--accent-red)';
        btnRemoverForm.style.background = 'transparent';
        btnRemoverForm.style.color = 'var(--accent-red)';
        btnRemoverForm.style.borderRadius = '6px';
        btnRemoverForm.style.cursor = 'pointer';

        btnRemoverForm.addEventListener('click', function() {
            // Remover do formulário
            wrapper.remove();
            // Remover também do modal se existir
            const modalItem = document.getElementById(id);
            if (modalItem) modalItem.remove();
        });

        wrapper.appendChild(btnRemoverForm);

        containerSelecionados.appendChild(wrapper);
        // Rolagem suave para o novo item (ajuda o usuário a ver a checkbox adicionada)
        setTimeout(() => {
            wrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            // dar um pequeno destaque visual
            wrapper.style.transition = 'box-shadow 0.25s ease, transform 0.25s ease';
            wrapper.style.transform = 'translateY(-4px)';
            wrapper.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
            setTimeout(() => {
                wrapper.style.transform = '';
                wrapper.style.boxShadow = '';
            }, 300);
        }, 50);
    }

    // Event listener para botão de adicionar acessório
    if (btnAdicionarAcessorio) {
        btnAdicionarAcessorio.addEventListener('click', adicionarAcessorio);
    }

    // Permitir adicionar acessório com Enter nos inputs
    if (inputNomeAcessorio) {
        inputNomeAcessorio.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                adicionarAcessorio();
            }
        });
    }

    // Note: valor/descricao inputs were removed; only Enter on nome field is handled above.
});
