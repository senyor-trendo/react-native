export interface PublicLibrary {
	id: string,
	name: string,
	searchAlias?: string
}
export const PublicLibraries: PublicLibrary[] =
	[
		{ id: "abrera", name: "ABRERA.Josep Roca i Bros" },
		{ id: "aiguafreda", name: "AIGUAFREDA.Les Escoles Velles" },
		{ id: "arenys-de-mar", name: "ARENYS DE MAR.Pare Fidel Fita" },
		{ id: "arenys-de-munt", name: "ARENYS DE MUNT" },
		{ id: "artes", name: "ARTÉS" },
		{ id: "avinyo", name: "AVINYÓ" },
		{ id: "bad-casacuberta", name: "BADALONA.Can Casacuberta" },
		{ id: "bad-llefia", name: "BADALONA.Llefià Xavier Soto" },
		{ id: "bad-lloreda", name: "BADALONA.Lloreda" },
		{ id: "bad-pomar", name: "BADALONA.Pomar" },
		{ id: "badia-del-valles", name: "BADIA DEL V.Vicente Aleixandre" },
		{ id: "balsareny", name: "BALSARENY.Pere Casaldàliga" },
		{ id: "barbera-del-valles", name: "BARBERÀ DEL V.Esteve Paluzie" },
		{ id: "bcn-barceloneta", name: "BCN CV.Barceloneta La Fraternitat", searchAlias: 'barcelona' },
		{ id: "bcn-bonnemaison", name: "BCN CV.Francesca Bonnemaison", searchAlias: 'barcelona' },
		{ id: "bcn-gotic", name: "BCN CV.Gòtic Andreu Nin", searchAlias: 'barcelona' },
		{ id: "bcn-sant-pau", name: "BCN CV.Sant Pau - Santa Creu", searchAlias: 'barcelona' },
		{ id: "bcn-eix-esquerra", name: "BCN EIX.Esquerra Eixample-A. Centelles", searchAlias: 'barcelona' },
		{ id: "bcn-eix-fort-pienc", name: "BCN EIX.Fort Pienc", searchAlias: 'barcelona' },
		{ id: "bcn-eix-sagrada-familia", name: "BCN EIX.Sagrada Família", searchAlias: 'barcelona' },
		{ id: "bcn-eix-sofia-barat", name: "BCN EIX.Sofia Barat", searchAlias: 'barcelona' },
		{ id: "bcn-gracia", name: "BCN GRA.Jaume Fuster", searchAlias: 'barcelona' },
		{ id: "bcn-horta-el-carmel", name: "BCN HG.El Carmel Juan Marsé", searchAlias: 'barcelona' },
		{ id: "bcn-horta-guinardo", name: "BCN HG.Guinardó M. Rodoreda", searchAlias: 'barcelona' },
		{ id: "bcn-horta-horta", name: "BCN HG.Horta Can Mariner", searchAlias: 'barcelona' },
		{ id: "bcn-les-corts", name: "BCN LC.Montserrat Abelló", searchAlias: 'barcelona' },
		{ id: "bcn-nb-canyelles", name: "BCN NB.Canyelles", searchAlias: 'barcelona' },
		{ id: "bcn-nb", name: "BCN NB.Nou Barris", searchAlias: 'barcelona' },
		{ id: "bcn-nb-vilapicina", name: "BCN NB.Vilapicina i la Torre Llobeta", searchAlias: 'barcelona' },
		{ id: "bcn-nb-zona-nord", name: "BCN NB.Zona Nord", searchAlias: 'barcelona' },
		{ id: "bcn-sa-ignasi-iglesias", name: "BCN SA.Ignasi Iglésias Can Fabra", searchAlias: 'barcelona' },
		{ id: "bcn-sa-sagrera", name: "BCN SA.La Sagrera - Marina Clotet", searchAlias: 'barcelona' },
		{ id: "bcn-sants", name: "BCN SM.Vapor Vell", searchAlias: 'barcelona' },
		{ id: "bcn-sm-arpa", name: "BCN SMA.Camp de l'Arpa-Caterina Albert", searchAlias: 'barcelona' },
		{ id: "bcn-sm-clot", name: "BCN SMA.El Clot - Josep Benet", searchAlias: 'barcelona' },
		{ id: "bcn-sm-garcia-marquez", name: "BCN SMA.Gabriel García Márquez", searchAlias: 'barcelona' },
		{ id: "bcn-sm-poblenou", name: "BCN SMA.Poblenou Manuel Arranz", searchAlias: 'barcelona' },
		{ id: "bcn-sarria-collserola", name: "BCN SSG.Collserola Josep Miracle", searchAlias: 'barcelona' },
		{ id: "bcn-sarria-foix", name: "BCN SSG.J.V. Foix", searchAlias: 'barcelona' },
		{ id: "begues", name: "BEGUES" },
		{ id: "bbus-cavall-bernat", name: "Bibliobús Cavall Bernat" },
		{ id: "bbus-el-castellot", name: "Bibliobús El Castellot" },
		{ id: "bbus-montau", name: "Bibliobús Montau" },
		{ id: "bbus-montnegre", name: "Bibliobús Montnegre" },
		{ id: "bbus-montserrat", name: "Bibliobús Montserrat" },
		{ id: "bbus-pedraforca", name: "Bibliobús Pedraforca-Magatzem" },
		{ id: "bbus-puigdon", name: "Bibliobús Puigdon" },
		{ id: "bbus-tagamanent", name: "Bibliobús Tagamanent" },
		{ id: "bigues-i-riells", name: "BIGUES I RIELLS DEL FAI" },
		{ id: "cabrera-de-mar", name: "CABRERA DE MAR.Ilturo" },
		{ id: "cabrils", name: "CABRILS" },
		{ id: "caldes-destrac", name: "CALDES D'ESTRAC.Can Milans" },
		{ id: "caldes-de-montbui", name: "CALDES DE MONTBUI" },
		{ id: "calella", name: "CALELLA.Can Salvador de la Plaça" },
		{ id: "canet-de-mar", name: "CANET DE MAR.P. Gual i Pujadas" },
		{ id: "capellades", name: "CAPELLADES.El Safareig" },
		{ id: "cardedeu", name: "CARDEDEU.Marc de Vilalba" },
		{ id: "cardona", name: "CARDONA.Marc de Cardona" },
		{ id: "castellbisbal", name: "CASTELLBISBAL.Josep Mateu i M." },
		{ id: "castelldefels", name: "CASTELLDEFELS" },
		{ id: "cerdanyola-del-valles", name: "CERDANYOLA DEL V.Central" },
		{ id: "cervello", name: "CERVELLÓ" },
		{ id: "collbato", name: "COLLBATÓ.S.Durfort" },
		{ id: "corbera-de-llobregat", name: "CORBERA DE LLOB" },
		{ id: "cor-central", name: "CORNELLÀ DE LLOB.Central" },
		{ id: "cor-campoamor", name: "CORNELLÀ DE LLOB.C.Campoamor" },
		{ id: "cor-marta-mata", name: "CORNELLÀ DE LLOB.Marta Mata" },
		{ id: "cor-pamies", name: "CORNELLÀ DE LLOB.T.Pàmies" },
		{ id: "cubelles", name: "CUBELLES.Mn. Joan Avinyó" },
		{ id: "franqueses-del-valles", name: "FRANQUESES DEL V., LES.C.d Avall" },
		{ id: "franqueses-magatzem", name: "FRANQUESES DEL V., LES.C.d Avall-Magatzem" },
		{ id: "garriga", name: "GARRIGA, LA" },
		{ id: "gava", name: "GAVÀ.Marian Colomé" },
		{ id: "granollers", name: "GRANOLLERS.Roca Umbert" },
		{ id: "hosp-can-sumarro", name: "HOSPITALET DE LLOB.Can Sumarro" },
		{ id: "hosp-janes", name: "HOSPITALET DE LLOB.J. Janés" },
		{ id: "hosp-la-florida", name: "HOSPITALET DE LLOB.La Florida" },
		{ id: "hosp-europa", name: "HOSPITALET DE LLOB.Plaça d'Europa" },
		{ id: "hosp-tecla-sala", name: "HOSPITALET DE LLOB.Tecla Sala" },
		{ id: "igualada", name: "IGUALADA.Central" },
		{
			id: "la-llagosta",
			name: "LLAGOSTA, LA"
		},
		{
			id: "llinars-del-v",
			name: "LLINARS DEL V"
		},
		{
			id: "llica-damunt",
			name: "LLIÇÀ D'AMUNT"
		},
		{
			id: "malgrat-de-mar",
			name: "MALGRAT DE MAR.La Cooperativa"
		},
		{
			id: "manlleu",
			name: "MANLLEU"
		},
		{
			id: "manresa-c",
			name: "MANRESA.C."
		},
		{
			id: "martorell",
			name: "MARTORELL.Francesc Pujols"
		},
		{
			id: "martorelles",
			name: "MARTORELLES.Lolita Milà"
		},
		{
			id: "el-masnou",
			name: "MASNOU, EL.Joan Coromines"
		},
		{
			id: "masquefa",
			name: "MASQUEFA"
		},
		{
			id: "matadepera",
			name: "MATADEPERA.Àngel Guimerà"
		},
		{
			id: "mataro-antoni-comas",
			name: "MATARÓ.Antoni Comas"
		},
		{
			id: "mataro-pompeu-fabra",
			name: "MATARÓ.Pompeu Fabra"
		},
		{
			id: "mataro-popular",
			name: "MATARÓ.Popular"
		},
		{
			id: "moia",
			name: "MOIÀ.Biblioteca 1 d'octubre"
		},
		{
			id: "molins-de-rei",
			name: "MOLINS DE REI.El Molí"
		},
		{
			id: "mollet-del-v",
			name: "MOLLET DEL V.Can Mulà.J.Solé Tura"
		},
		{
			id: "montgat",
			name: "MONTGAT.Tirant lo Blanc"
		},
		{
			id: "montmelo",
			name: "MONTMELÓ.La Grua"
		},
		{
			id: "montornes-del-v",
			name: "MONTORNÈS DEL V"
		},
		{
			id: "navarcles",
			name: "NAVARCLES.St. Valentí"
		},
		{
			id: "navas",
			name: "NAVÀS.Josep Mas Carreras"
		},
		{
			id: "olesa-de-m",
			name: "OLESA DE M.Sta. Oliva-Fons especial: Legiland"
		},
		{
			id: "palafolls",
			name: "PALAFOLLS.Enric Miralles"
		},
		{
			id: "el-papiol",
			name: "PAPIOL,EL."
		},
		{
			id: "parets-del-v",
			name: "PARETS DEL V.Can Rajoler"
		},
		{
			id: "pineda-de-mar",
			name: "PINEDA DE MAR.Manuel Serra i Moret"
		},
		{
			id: "el-pont-de-vilomara",
			name: "PONT DE VILOMARA, EL."
		},
		{
			id: "prat-de-llob",
			name: "PRAT DE LLOB., EL.Antonio Martín S."
		},
		{
			id: "premia-de-dalt",
			name: "PREMIÀ DE DALT.Jaume Perich"
		},
		{
			id: "premia-de-mar",
			name: "PREMIÀ DE MAR.M. Rosselló"
		},
		{
			id: "puig-reig",
			name: "PUIG-REIG.Guillem de Berguedà"
		},
		{
			id: "ripollet",
			name: "RIPOLLET"
		},
		{
			id: "la-roca-del-v",
			name: "ROCA DEL V., LA"
		},
		{
			id: "rubi",
			name: "RUBÍ.Mestre Martí Tauler"
		},
		{
			id: "sabadell-can-puiggener",
			name: "SABADELL.Can Puiggener"
		},
		{
			id: "sabadell-la-serra",
			name: "SABADELL.La Serra"
		},
		{
			id: "sabadell-nord",
			name: "SABADELL.Nord"
		},
		{
			id: "sabadell-ponent",
			name: "SABADELL.Ponent"
		},
		{
			id: "sabadell-vapor-badia",
			name: "SABADELL.Vapor Badia"
		},
		{
			id: "sallent",
			name: "SALLENT.St. Antoni M. Claret"
		},
		{
			id: "sentmenat",
			name: "SENTMENAT.Frederic Alfonso i Orfila"
		},
		{
			id: "sitges",
			name: "SITGES.Josep Roig i Raventós"
		},
		{
			id: "st-adria-de-b",
			name: "ST. ADRIÀ DE B.Sant Adrià"
		},
		{
			id: "st-andreu-de-la-barca",
			name: "ST. ANDREU DE LA BARCA.Aigüestoses"
		},
		{
			id: "st-andreu-de-llavaneres",
			name: "ST. ANDREU DE LLAVANERES.Font i D."
		},
		{
			id: "st-boi-j-rubio-i-balaguer",
			name: "ST. BOI DE LLOB.J. Rubió i Balaguer"
		},
		{
			id: "st-boi-maria-aurelia-capmany",
			name: "ST. BOI DE LLOB.Maria Aurèlia Capmany"
		},
		{
			id: "st-celoni",
			name: "ST. CELONI.l'Escorxador"
		},
		{
			id: "st-climent-de-llob",
			name: "ST. CLIMENT DE LLOB"
		},
		{
			id: "st-cugat-del-v-miquel-batllori",
			name: "ST. CUGAT DEL V.Miquel Batllori"
		},
		{
			id: "st-esteve-s-joan-pomar-i-sola",
			name: "ST. ESTEVE S.Joan Pomar i Solà"
		},
		{
			id: "st-feliu-de-codines",
			name: "ST. FELIU DE CODINES.Joan Petit i Aguilar"
		},
		{
			id: "st-feliu-de-llob",
			name: "ST. FELIU DE LLOB.Montserrat Roig"
		},
		{
			id: "st-fost-de-campsentelles",
			name: "ST. FOST DE CAMPSENTELLES"
		},
		{
			id: "st-fruitos-de-b",
			name: "ST. FRUITÓS DE B.Biblioteca"
		},
		{
			id: "st-hipolit",
			name: "ST. HIPÒLIT.Marquès de Remisa"
		},
		{
			id: "st-joan-de-vilatorrada",
			name: "ST. JOAN DE VILATORRADA.Cal Gallifa"
		},
		{
			id: "st-joan-despi-m-marti-i-pol",
			name: "ST. JOAN DESPÍ.M. Martí i Pol"
		},
		{
			id: "st-joan-despi-m-rodoreda",
			name: "ST. JOAN DESPÍ.M.Rodoreda"
		},
		{
			id: "st-just-desvern",
			name: "ST. JUST DESVERN.Joan Margarit"
		},
		{
			id: "st-marti-sarroca",
			name: "ST. MARTÍ SARROCA. Neus Català i Pallejà"
		},
		{
			id: "st-pere-de-ribes",
			name: "ST. PERE DE RIBES.Josep Pla"
		},
		{
			id: "st-pere-de-torello",
			name: "ST. PERE DE TORELLÓ.l'Esqueller"
		},
		{
			id: "st-quirze-de-besora",
			name: "ST. QUIRZE DE BESORA.Pompeu Fabra"
		},
		{
			id: "st-quirze-del-v",
			name: "ST. QUIRZE DEL V. Marcel Ayats"
		},
		{
			id: "st-sadurni",
			name: "ST. SADURNÍ.Ramon Bosch de Noya"
		},
		{
			id: "st-vicenc-de-c",
			name: "ST. VICENÇ DE C.S. Vives Casajuana"
		},
		{
			id: "st-vicenc-de-montalt",
			name: "ST. VICENÇ DE MONTALT.La Muntala"
		},
		{
			id: "st-vicenc-dels-horts",
			name: "ST. VICENÇ DELS HORTS.Les Voltes"
		},
		{
			id: "sta-coloma-de-c",
			name: "STA. COLOMA DE C.Pilarín Bayés"
		},
		{
			id: "gramenet-can-peixauet",
			name: "STA. COLOMA DE GRAMENET.Can Peixauet"
		},
		{
			id: "gramenet-central",
			name: "STA. COLOMA DE GRAMENET.Central"
		},
		{
			id: "gramenet-fondo",
			name: "STA. COLOMA DE GRAMENET.Fondo"
		},
		{
			id: "gramenet-singulerin",
			name: "STA. COLOMA DE GRAMENET.Singuerlín"
		},
		{
			id: "sta-eulalia-de-roncana",
			name: "STA. EULÀLIA DE RONÇANA"
		},
		{
			id: "sta-m-monjos",
			name: "STA. M.MONJOS"
		},
		{
			id: "sta-margarida-de-montbui",
			name: "STA. MARGARIDA DE MONTBUI"
		},
		{
			id: "sta-maria-de-palautordera",
			name: "STA. MARIA DE PALAUTORDERA.Ferran Soldevila"
		},
		{
			id: "sta-perpetua-de-mogoda",
			name: "STA. PERPÈTUA DE MOGODA"
		},
		{
			id: "suria",
			name: "SÚRIA"
		},
		{
			id: "taradell",
			name: "TARADELL.Antoni Pladevall i Font"
		},
		{
			id: "teia",
			name: "TEIÀ.Can Llaurador"
		},
		{
			id: "terrassa-districte-3",
			name: "TERRASSA.Districte 3"
		},
		{
			id: "terrassa-districte-4",
			name: "TERRASSA.Districte 4"
		},
		{
			id: "terrassa-districte-5",
			name: "TERRASSA.Districte 5"
		},
		{
			id: "tiana",
			name: "TIANA.Can Baratau"
		},
		{
			id: "tona",
			name: "TONA.Caterina Figueras"
		},
		{
			id: "tordera",
			name: "TORDERA"
		},
		{
			id: "torello",
			name: "TORELLÓ.Barri Montserrat"
		},
		{
			id: "torrelles-de-llob",
			name: "TORRELLES DE LLOB.Pompeu Fabra"
		},
		{
			id: "vallirana",
			name: "VALLIRANA.J.M. López-Picó"
		},
		{
			id: "vic",
			name: "VIC.Pilarin Bayés"
		},
		{
			id: "viladecans",
			name: "VILADECANS"
		},
		{
			id: "viladecavalls",
			name: "VILADECAVALLS.Pere Calders"
		},
		{
			id: "vil-valles",
			name: "VILANOVA DEL VALLÈS"
		},
		{
			id: "vil-geltru-armand-cardona-torrandell",
			name: "VILANOVA I LA G.Armand Cardona Torrandell"
		},
		{
			id: "vil-geltru-joan-oliva-i-mila",
			name: "VILANOVA I LA G.Joan Oliva i Milà"
		},
		{
			id: "vilassar-de-dalt",
			name: "VILASSAR DE DALT.Can Manyer"
		},
		{
			id: "vilassar-de-mar",
			name: "VILASSAR DE MAR.Ernest Lluch"
		}
	];