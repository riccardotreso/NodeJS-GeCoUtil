
$(function(){
	
	var model = new Model();
	ko.applyBindings(model);

});


Model = function () {
    var self = this;
    self.Result = ko.observableArray([]);
	self.Filter = ko.observable(new PageFilter("","","","","","",true));
	
	
	self.searchCollaborazioni = function () {
		showLoading();
        $.ajax({
            url: "/methode/result",
            type: 'POST',
            data: ko.toJSON(self.Filter()),
            contentType: 'application/json',
            success: function (result) {
				self.Result.removeAll();
                $.each(result, function (index, value) {
					self.Result.push(new Collaborazione(value.DataCollaborazioneIf, value.Titolo, value.PaginaUscita, value.Product, value.Header, value.Section));
				});
				hideLoading();
            }
        });
    }

};

Collaborazione = function(DataCollaborazioneIf, Titolo, PaginaUscita, Product, Header, Section)
{
	var self = this;
	
	self.DataCollaborazioneIf = DataCollaborazioneIf;
	self.Titolo = Titolo;
	self.PaginaUscita = PaginaUscita;
	self.Product = Product;
	self.Header = Header;
	self.Section = Section;
};


PageFilter = function (Product, Header, Section, Data, Titolo, Pagina, IsBidone) {
    var self = this;

    self.Product = ko.observable(Product);
    self.Header = ko.observable(Header);
    self.Section = ko.observable(Section);
    self.Data = ko.observable(Data);
    self.Titolo = ko.observable(Titolo);
    self.Pagina = ko.observable(Pagina);
    self.IsBidone = ko.observable(IsBidone);

};