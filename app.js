// Collapsible Event Listner
var coll = document.getElementById("collapsible");
var con = document.getElementById("collapsible_content");
coll.addEventListener("click", function(){
  if(con.style.display === "block"){
    con.style.display = "none";
  }
  else {
    con.style.display = "block";
  }
})
function checkBoxs(e){
  var checkBoxs = document.getElementsByClassName("checkbox");
  if(e.checked){
    for (var i = 0; i < checkBoxs.length; i++) {
      checkBoxs[i].checked = true;
    }
  }
  else{
    for (var i = 0; i < checkBoxs.length; i++) {
      checkBoxs[i].checked = false;
    }
  }
}


const panierInitial = [
    { ref: "prod_1", prix: 340.89, qte: 4 },
    { ref: "prod_2", prix: 44.89, qte: 7 },
    { ref: "prod_3", prix: 3.9, qte: 9 },
    { ref: "prod_4", prix: 77.69, qte: 14 },
    { ref: "prod_5", prix: 66.5, qte: 40 },
    { ref: "prod_6", prix: 77.89, qte: 3 },
  ];

  class Panier {
    constructor(items = []) {
      this.items = items;
    }
    add(ref, prix, qte = 1) {
      if (ref === undefined) return;
      if (prix === undefined) return;
      this.items.push(new Item(ref, prix, qte));
    }
    remove(ref) {
      const itemIndex = this.items.findIndex((item) => item.ref === ref);
      if (itemIndex >= 0) this.items.splice(itemIndex, 1);
    }
    list() {
      this.items.forEach((i) => console.log(i));
    }
    getItems() {
      return this.items;
    }

    sortByPrice() {
      this.items.sort(this.sf);
    }

    getTotal() {
      return this.items
        .map((i) => i.prix * i.qte)
        .reduce((acc, st) => (acc += st), 0);
    }
    sf(e1, e2) {
      return e2.prix - e1.prix;
    }
    clear() {
      this.items = [];
    }
  }
  class Item {
    constructor(r, p, q) {
      this.ref = r;
      this.prix = p;
      this.qte = q;
    }
  }

  class View {
    //   constructor()
    constructor(p){
      this.panier = p;
    }
    afficher(){
      //creation du tableau et remplissage
      var tbody = document.getElementsByTagName("tbody")
      for(var i = 0 ; i < this.panier.items.length ; i++){
        var input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("class", "checkbox");
        input.setAttribute("name", "select");
        var th = document.createElement("th");
        th.appendChild(input);
        var row = document.createElement("tr");
        row.appendChild(th);
        th = document.createElement("th");
        th.setAttribute("scope", "row");
        th.innerText = i;
        row.appendChild(th);
        var td = document.createElement("td");
        td.innerText = this.panier.items[i].ref;
        row.appendChild(td);
        td = document.createElement("td");
        td.innerText = this.panier.items[i].prix;
        row.appendChild(td);
        input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "form-control");
        input.setAttribute("value", this.panier.items[i].qte);
        td = document.createElement("td");
        td.appendChild(input);
        row.appendChild(td);
        tbody[0].appendChild(row);
      }
      input = document.getElementById("total");
      input.setAttribute("value", this.panier.getTotal().toFixed(2));
    }
  }

  let view =  new View(new Panier(panierInitial));
  view.afficher();
