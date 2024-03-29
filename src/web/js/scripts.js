if (typeof prox3000 == "undefined" || !prox3000) {
    var prox3000 = {};
}

prox3000.gallery = {
    init: function () {
        $('.prox3000-gallery-item a.delete').on('click', this.deleteProductImage);
        $('.prox3000-gallery-item a.write').on('click', this.callModal);
        $('.prox3000-gallery img').on('click', this.setMainProductImage);
        $('.noctua-gallery-form').on('submit', this.writeProductImage);
    },
    setMainProductImage: function () {
        prox3000.gallery._sendData($(this).data('action'), $(this).parents('li').data());
        $('.prox3000-gallery > li').removeClass('main');
        $(this).parents('li').addClass('main');
        return false;
    },

    writeProductImage: function (event) {
        event.preventDefault();
        var modalContainer = $('#noctua-gallery-modal');
        var form = $(this).find('form');
        var data = form.serialize();
        var url = form.attr('action');
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            success: function (result) {
                var json = $.parseJSON(result);
                if (json.result == 'success') {
                    modalContainer.modal('hide');
                }
                else {
                    alert(json.error);
                }
            }
        });
    },

    callModal: function (event) {
        event.preventDefault();
        var modalContainer = $('#noctua-gallery-modal');
        var url = $(this).data('action');
        modalContainer.modal({show:true});
        data = $(this).parents('.prox3000-gallery-item').data();
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            success: function (data) {
                $('.noctua-gallery-form').html(data);
            }
        });
    },
    deleteProductImage: function () {
        if (confirm('realy?')) {
            prox3000.gallery._sendData($(this).data('action'), $(this).parents('.prox3000-gallery-item').data());
            $(this).parents('.prox3000-gallery-item').hide('slow');
        }
        return false;
    },
    _sendData: function (action, data) {
        return $.post(
            action,
            {image: data.image, id: data.id, model: data.model},
            function (answer) {
                var json = $.parseJSON(answer);
                if (json.result == 'success') {

                }
                else {
                    alert(json.error);
                }
            }
        );
    }
};

prox3000.gallery.init();