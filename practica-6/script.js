$(document).ready(function() {
    $('#hanoiForm').on('submit', function(e) {
        e.preventDefault();
        const discs = parseInt($('#discsInput').val());
        const moves = [];
        
        function hanoi(n, from, to, aux) {
            if (n === 1) {
                moves.push(`Mueve el disco 1 de la varilla ${from} a la varilla ${to}`);
            } else {
                hanoi(n - 1, from, aux, to);
                moves.push(`Mueve el disco ${n} de la varilla ${from} a la varilla ${to}`);
                hanoi(n - 1, aux, to, from);
            }
        }

        $('#movesList').empty();
        hanoi(discs, 'A', 'C', 'B');

        moves.forEach(move => {
            $('#movesList').append(`<li>${move}</li>`);
        });
    });
});
