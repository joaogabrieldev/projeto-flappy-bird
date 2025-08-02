# 🐦 Projeto Flappy Bird

Uma recriação completa do clássico jogo Flappy Bird desenvolvida com tecnologias web modernas.

## 📋 Descrição

Este projeto é uma implementação fiel do jogo Flappy Bird usando HTML5, CSS3 e JavaScript puro (Vanilla JS). O jogo mantém a mecânica original onde o jogador controla um pássaro que deve navegar entre barreiras sem colidir.

## 🚀 Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica e canvas para renderização
- **CSS3** - Estilização avançada com Flexbox e animações
- **JavaScript (ES6+)** - Lógica do jogo e interações
- **Fontes Customizadas** - Pixel e Symtext para interface retro

### Bibliotecas e Dependências
- **Vanilla JavaScript** - Sem dependências externas
- **CSS Animations** - Keyframes para efeitos visuais

## 🏗️ Arquitetura do Projeto

### Estrutura de Diretórios
```
projeto-flappy-bird/
├── 📁 css/
│   ├── estilo.css      # Estilos globais e tipografia
│   ├── flappy.css      # Estilos específicos do jogo
│   └── menu.css        # Estilos do menu e interface
├── 📁 js/
│   └── flappy.js       # Lógica principal do jogo
├── 📁 fonts/
│   ├── Oswald-Regular.ttf
│   ├── Pixel.ttf
│   └── Symtext.ttf
├── 📁 imgs/
│   ├── passaro.png     # Sprite do pássaro
│   └── dom.png
└── flappy.html         # Página principal
```

## 🎮 Funcionalidades

### Mecânicas do Jogo
- **Controle do Pássaro** - Clique ou pressione qualquer tecla para voar
- **Geração de Barreiras** - Sistema procedural de criação de obstáculos
- **Sistema de Pontuação** - Contador de progresso em tempo real
- **Detecção de Colisão** - Algoritmo preciso de verificação de hits
- **Game Over** - Tela de fim de jogo com opção de reiniciar

### Interface do Usuário
- **Menu Inicial** - Botão animado para iniciar o jogo
- **Feedback Visual** - Animações e transições suaves
- **Design Responsivo** - Interface adaptável
- **Tipografia Retro** - Fontes pixeladas para nostalgia

## 🔧 Padrões de Projeto

### Programação Orientada a Objetos
```javascript
// Classes principais implementadas:
- Barreira          // Representa uma barreira individual
- ParDeBarreiras    // Par de barreiras (superior/inferior)
- ConjuntoBarreiras // Gerenciamento de múltiplas barreiras
- Passaro          // Controle e animação do pássaro
- Progresso        // Sistema de pontuação
- FlappyBird       // Classe principal do jogo
```

### Padrões de Design
- **Factory Pattern** - Função `NovoElemento()` para criação de elementos
- **Observer Pattern** - Sistema de notificação de eventos
- **Game Loop** - Loop principal de animação
- **Component-Based Architecture** - Componentes modulares e reutilizáveis

### Estrutura CSS
- **BEM Methodology** - Nomenclatura consistente de classes
- **CSS Custom Properties** - Variáveis para manutenibilidade
- **Flexbox Layout** - Layout responsivo e flexível
- **CSS Animations** - Transições e keyframes otimizados

## 🎨 Design System

### Paleta de Cores
- **Fundo Principal**: `#0D262D` (Azul escuro)
- **Céu**: `deepskyblue`
- **Barreiras**: Gradiente `#639301` → `#a5e82e`
- **Texto**: `#fff` (Branco)

### Tipografia
- **Fonte Principal**: Oswald (Google Fonts)
- **Fonte Pixel**: Pixel.ttf (Interface do jogo)
- **Fonte Símbolos**: Symtext.ttf (Elementos especiais)

## 🚀 Como Executar

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor local (opcional, para desenvolvimento)

### Instalação
1. Clone o repositório:
```bash
git clone https://github.com/joaogabrieldev/projeto-flappy-bird.git
cd projeto-flappy-bird
```
2. Abra o arquivo `flappy.html` no navegador ou use um servidor local:
```bash
# Usando Python
python -m http.server 8000

# Usando Node.js
npx serve .
```

## 🎯 Como Jogar

1. **Iniciar**: Clique no botão "Iniciar o Jogo!" na tela inicial
2. **Controle**: Pressione qualquer tecla ou clique para fazer o pássaro voar
3. **Objetivo**: Navegue entre as barreiras sem colidir
4. **Pontuação**: Cada barreira atravessada adiciona 1 ponto
5. **Game Over**: Ao colidir, o jogo termina e você pode reiniciar

### Estrutura de Classes
- **Modularidade**: Cada classe tem responsabilidade específica
- **Encapsulamento**: Métodos privados e públicos bem definidos
- **Herança**: Estrutura hierárquica clara
- **Polimorfismo**: Interfaces consistentes entre classes

### Otimizações Implementadas

- **Memória**: Gerenciamento eficiente de elementos DOM
- **Responsividade**: Layout adaptável a diferentes resoluções
- **Acessibilidade**: Suporte a navegação por teclado

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Adicionar novas funcionalidades
- Melhorar a documentação


