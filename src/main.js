
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

import "leaflet-sidebar-v2/js/leaflet-sidebar.js";
import "leaflet-sidebar-v2/css/leaflet-sidebar.css";


const FEATURES = {
	"Naracoorte Creek": { lat: -36.96667, lon: 140.66667,
	description: "Naracoorte Creek is the waterway that runs through the centre of the town of Naracoorte in South Australia's Limestone Coast region, and the town's name is itself believed to derive from an Aboriginal word meaning 'place of running water' or 'large waterhole'. The creek was the reason the first European settler, George Ormerod, established the Naracoorte Run and built his hut on its banks in 1842, making it the focal point of the region's earliest non-Indigenous occupation. Its course effectively divided the emerging township in two, and this geographic split gave rise to two separate settlements on either side: Kincraig, founded in 1845 by Scottish explorer William Macintosh, and the government-laid-out town of Narracoorte, established in 1847 on the opposite bank."},
	"Nalang": { lat: -36.38333, lon: 140.76667,
	description: "Nalang is a small rural locality situated about 12 kilometres north-west of Colac in western Victoria, on the eastern shore of Lake Corangamite — one of the largest permanent saltwater lakes on the Australian continent. The name is thought to derive from an Aboriginal word for a type of weapon, reflecting the deep presence of the Djargurd Wurrung people in this fertile volcanic landscape long before European contact. The land was first taken up as a pastoral run in the mid-nineteenth century, but it was the subdivision of the run into smaller farming allotments, beginning around 1865 and continuing through the 1880s, that gave rise to a settled farming community." },
	"Karaweena": { lat: -26.7772, lon: 151.33474 ,
	description: "Karaweena is a small locality in New South Wales whose name is of Aboriginal origin, reflecting the long custodianship of the land by First Nations peoples prior to European settlement. Like many of the smaller named places of rural and semi-rural New South Wales, Karaweena emerged as an identifiable locality during the era of pastoral expansion in the nineteenth century, when large runs were taken up across the colony and later subdivided into smaller selections under the Land Acts of the 1860s and beyond." },
	"Kackerabout Creek": { lat: -38.16667, lon: 145.1 ,
	description: "Kackerabout Creek (sometimes recorded as Kackeraboite Creek) is a watercourse in the southern suburbs of Melbourne's metropolitan fringe, situated near Mount Eliza on the Mornington Peninsula. The creek forms part of the northern administrative boundary of the Mornington Peninsula Shire, running roughly between Mount Eliza on Port Phillip Bay and the townships of Tyabb and Somerville to the east. The land through which the creek flows was originally the territory of the Boonwurrung people — specifically the Mayone-bulluk and Boonwurrung-Balluk clans — who had inhabited the Mornington Peninsula and its coastal foreshore for tens of thousands of years before European arrival." },
	"Goroke": { lat: -36.71788, lon: 141.47305 ,
	description: "Goroke is a small town in Victoria's Wimmera region, located in what is now the West Wimmera Shire, and its name derives from an Aboriginal word for the Australian magpie. The surrounding district was occupied for pastoral runs from the mid-1840s, but the town itself came into being after farm selections were taken up in the area from the late 1870s. Goroke Township was surveyed in 1882 and quickly established itself as a service centre for the local farming community, reaching a population of around 50 by 1884. One of the district's most notable early events occurred in 1864, when three children — Isaac, Jane, and Frank Duff — were lost in the bush after being sent out to gather heath for broom-making, an incident that became part of Wimmera folklore." },
	"Feather Reef": { lat: -17.53333, lon: 146.38333 ,
	description: "Feather Reef is a small locality in New South Wales, a named place that — like many of the scattered communities of rural NSW — arose during the colonial period of agricultural and pastoral expansion. The name, evocative of the reef-like outcrops or ridgelines common in parts of the NSW landscape, likely has its origins in the descriptive place-naming conventions of early European settlers, who often used natural features as shorthand for a location. The broader district in which Feather Reef sits was settled progressively through the nineteenth century as land was opened for grazing and later closer settlement." },
	"Burrumbela": { lat: -35.78333, lon: 149.95 ,
	description: "Burrumbela is a locality in the Eurobodalla district of southeastern New South Wales, situated near the Deua River Valley roughly 90 kilometres south-east of Canberra. The name is of Aboriginal origin, echoing the presence of the South Coast Yuin and Bugelli-Manji peoples who have inhabited the rich forests and coastal river valleys of this region for many thousands of years. European settlement in the Eurobodalla began from 1828, with early land-takers establishing themselves on the banks of the Moruya River; the wider district opened up gradually through the 1830s and 1840s as pastoralists pushed further inland and up into the forested river valleys." },
	"Boyne River": { lat: -23.95053, lon: 151.35933 ,
	description: "The Boyne River is a significant watercourse in Central Queensland, flowing eastward toward the coast near Gladstone, and it gives its name to the surrounding Boyne Valley locality. The river was named by the explorer John Oxley in 1823 during his overland expedition through the region — one of the earliest European traversals of what would become Queensland — and the name honours the River Boyne in Ireland, a common practice of bestowing familiar Old World names on new discoveries. The Boyne Valley itself, a rural locality in the Gladstone Region roughly 70 kilometres south-west of Gladstone, contains several small communities including Nagoorin, Ubobo, Builyan, and Many Peaks." },
	"Boondandilla": { lat: -27.90236, lon: 150.60726 ,
	description: "Boondandilla is a sparsely populated rural locality in the Goondiwindi Region of Queensland, covering approximately 273 square kilometres on the western Darling Downs and encompassing much of the Boondandilla State Forest. The name is of likely Aboriginal origin, consistent with the rich Indigenous naming traditions of the Kambuwal and Bigambul peoples who have long connections to this part of southern Queensland. European pastoralists moved into the Darling Downs in the 1840s, and the land around present-day Boondandilla was taken up as part of the broader wave of squatting and pastoral consolidation that swept across the region in the mid-nineteenth century." },
};


// needed to properly load the images in the Leaflet CSS
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

// from https://switch2osm.org/using-tiles/getting-started-with-leaflet/
var map = L.map("map").setView({ lon: 0, lat: 0 }, 2);

// add the OpenStreetMap tiles
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
}).addTo(map);

// show the scale bar on the lower left corner
L.control.scale().addTo(map);


// add sidebar

const sidebar = L.control.sidebar({
    container: 'sidebar',
    autopan: true,
    closeButton: true,
}).addTo(map);


function updateSidebar(name, description) {
	sidebar.removePanel("main");
	sidebar.addPanel({
    	    id: "main",
    	    tab: '<i class="fa fa-home">',
    	    pane: `<p><b>${name}</b></p><p>${description}</p>`
	});
}



Object.keys(FEATURES).map((name) => {
    const f = FEATURES[name];
    L.marker({ lon: f.lon, lat: f.lat }).bindPopup(name).addTo(map);
});

map.on('popupopen', (e) => {
    console.log(e.popup);
    const f = FEATURES[e.popup._content];
    updateSidebar(e.popup._content, f.description);
    sidebar.open("main");
});

map.on('popupclose', (e) => {
    sidebar.close();
});
