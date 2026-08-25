export const CATALOG_CATEGORIES = {
  FRIENDSHIP_LOVE: "Amistad & Amor",
  BABIES_BIRTHS: "Bebés & Nacimientos",
  WELLNESS_SPA: "Bienestar & Spa",
  SNOOPY_COLLECTION: "Colección Snoopy",
  CUSTOM_BOXES: "Box Personalizables",
  FRIENDS_BACHELORETTE: "Entre amigos - Despedidas",
  PETS: "Mascotas",
  CORPORATE_PACKAGING: "Packaging y Empresarial",
  THERMOS_CUPS: "Termos & Tazas",
  CREATIVE_STATIONERY: "Papelería Creativa",
  INTERNAL: "Inicio",
} as const;

export type Product = {
  id: string;
  reference: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  categories: string[];
  imageIds: number[];
  description: string;
};

export const categories = [
  CATALOG_CATEGORIES.FRIENDSHIP_LOVE,
  CATALOG_CATEGORIES.BABIES_BIRTHS,
  CATALOG_CATEGORIES.WELLNESS_SPA,
  CATALOG_CATEGORIES.SNOOPY_COLLECTION,
  CATALOG_CATEGORIES.CUSTOM_BOXES,
  CATALOG_CATEGORIES.FRIENDS_BACHELORETTE,
  CATALOG_CATEGORIES.PETS,
  CATALOG_CATEGORIES.CORPORATE_PACKAGING,
  CATALOG_CATEGORIES.THERMOS_CUPS,
  CATALOG_CATEGORIES.CREATIVE_STATIONERY,
] as const;

export const products: Product[] = [
  {
    "id": "13",
    "reference": "120536",
    "name": "Diadema pelo",
    "slug": "brown-bear-vector-graphics",
    "price": 6.61157,
    "stock": 6,
    "categories": [
      CATALOG_CATEGORIES.WELLNESS_SPA,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      16,
      39
    ],
    "description": "<p><strong>Diadema de pelo con figuras de animales</strong>, disponible en <strong>color camel o gris claro</strong>.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>\n<p></p>"
  },
  {
    "id": "14",
    "reference": "120531",
    "name": "Atrapasueño",
    "slug": "hummingbird-vector-graphics",
    "price": 4.132231,
    "stock": 5,
    "categories": [
      CATALOG_CATEGORIES.WELLNESS_SPA,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      17
    ],
    "description": "<p><strong>Atrapasueños delicado y decorativo</strong>, que estimula la <strong>visión y la emoción</strong>, creando un ambiente <strong>calmado y seguro</strong>.</p>\n<p><strong>Medidas:</strong> 7 × 29 cm</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "15",
    "reference": "120505",
    "name": "Magia personal",
    "slug": "pack-mug-framed-poster",
    "price": 16.528926,
    "stock": 5,
    "categories": [
      CATALOG_CATEGORIES.CUSTOM_BOXES,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      23
    ],
    "description": "<p><strong>BONUS:</strong> Tu caja, tu estilo; combínala y elige <strong>un bonus sorpresa</strong>.</p>\n<p>Los productos se incluyen de forma <strong>aleatoria</strong>, según disponibilidad.</p>\n<p><em>Las imágenes del catálogo son referenciales; colores, modelos y diseños pueden variar según disponibilidad sin previo aviso.</em></p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "19",
    "reference": "120501",
    "name": "Ternura Natural",
    "slug": "customizable-mug",
    "price": 49.586777,
    "stock": 3,
    "categories": [
      CATALOG_CATEGORIES.CUSTOM_BOXES,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      81,
      28
    ],
    "description": "<p><strong>Caja Ternura Natural</strong>, diseñada para transmitir <strong>calma, suavidad y amor</strong> desde el primer instante. Con un estilo <strong>minimalista</strong> y tonos crema, beige y madera natural, combina <strong>belleza, funcionalidad y armonía</strong>, ideal para <strong>baby shower, nacimiento o primera visita al recién nacido</strong>.</p>\n<p><strong>Contenido:</strong></p>\n<p>1 <strong>trapito de apego</strong>, color cúrcuma</p>\n<p>1 <strong>juguete de tela</strong>, color cúrcuma</p>\n<p>1 <strong>babero de tela</strong>, color cúrcuma</p>\n<p>1 <strong>pañal de algodón “Corazones”</strong></p>\n<p>1 <strong>tarjeta “Ternura Natural”</strong></p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "20",
    "reference": "120506",
    "name": "Ritual amor propio",
    "slug": "ritual-amor-propio",
    "price": 16.528926,
    "stock": 5,
    "categories": [
      CATALOG_CATEGORIES.CUSTOM_BOXES,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      29
    ],
    "description": "<p><strong>BONUS:</strong> Tu caja, tu estilo; combínala y elige <strong>un bonus sorpresa</strong>.</p>\n<p>Los productos se incluyen de forma <strong>aleatoria</strong>, según disponibilidad.</p>\n<p><em>Las imágenes del catálogo son referenciales; colores, modelos y diseños pueden variar según disponibilidad sin previo aviso.</em></p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "21",
    "reference": "120502",
    "name": "Sweet Baby",
    "slug": "customizable-mug",
    "price": 63.636364,
    "stock": 3,
    "categories": [
      CATALOG_CATEGORIES.CUSTOM_BOXES,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      30,
      31
    ],
    "description": "<p><strong>Caja Sweet Baby</strong>, una delicada selección de productos pensada para celebrar la llegada de un <strong>nuevo bebé</strong>. Combina <strong>suavidad, ternura y estilo cálido</strong> en tonos tierra, crema, beige y marrón, ideal para un regalo <strong>significativo y estéticamente impecable</strong>.</p>\n<p><strong>Contenido:</strong></p>\n<p>1 <strong>chupetero</strong></p>\n<p>1 <strong>juguete sonajero masticable</strong></p>\n<p>1 <strong>conejo, juego relajante</strong></p>\n<p>1 <strong>toalla confort estrella</strong></p>\n<p>1 <strong>manta beige</strong></p>\n<p>1 <strong>tarjeta “Sweet Baby”</strong></p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "22",
    "reference": "120503",
    "name": "My Birthday Box",
    "slug": "customizable-mug",
    "price": 46.280992,
    "stock": 5,
    "categories": [
      CATALOG_CATEGORIES.CUSTOM_BOXES,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      32,
      33
    ],
    "description": "<p><strong>Caja de regalo personalizada</strong>, perfecta para celebrar cumpleaños con <strong>estilo, humor y un toque único</strong>. Contiene productos decorativos, divertidos y reutilizables, seleccionados para crear una experiencia <strong>especial y memorable</strong>.</p>\n<p><strong>Contenido:</strong></p>\n<p>1 <strong>bolsa con 5 globos</strong></p>\n<p>1 <strong>vela volcán o vela en cera</strong> (solo para envíos)</p>\n<p>1 <strong>cupcake de peluche </strong></p>\n<p>2 <strong>gafas “My Birthday”</strong></p>\n<p>1 <strong>tarjeta “My Birthday”</strong></p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "23",
    "reference": "120504",
    "name": "My Birthday Box Plus",
    "slug": "customizable-mug",
    "price": 60.330579,
    "stock": 5,
    "categories": [
      CATALOG_CATEGORIES.CUSTOM_BOXES,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      35,
      34
    ],
    "description": "<p><strong>Caja de regalo personalizada</strong>, diseñada para celebrar cumpleaños con <strong>estilo, humor y un toque único</strong>. Incluye productos decorativos, divertidos y reutilizables, seleccionados para crear una experiencia <strong>especial y memorable</strong>.</p>\n<p><strong>Contenido:</strong></p>\n<p>1 <strong>bolsa con 5 globos</strong></p>\n<p>1 <strong>vela volcán o vela en cera</strong> (solo para envíos)</p>\n<p>1 <strong>peluche cupcake </strong></p>\n<p>2 <strong>gafas “My Birthday”</strong></p>\n<p>1 <strong>tarjeta “My Birthday”</strong></p>\n<p>1 <strong>bolsa BONUS a elegir: </strong>Magia Personal, Ritual Amor Propio, Spa o Celebra Tus Logros</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "24",
    "reference": "1205011",
    "name": "My Breakfast Box",
    "slug": "customizable-mug",
    "price": 49.586777,
    "stock": 11,
    "categories": [
      CATALOG_CATEGORIES.CUSTOM_BOXES,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      37
    ],
    "description": "<p><strong>My Breakfast Box</strong>, el regalo perfecto para comenzar la mañana con una sonrisa y sorprender a esa persona especial.</p>\n<p><strong>Contenido:</strong></p>\n<p>1 <strong>bolsa con 5 globos festivos</strong></p>\n<p>1 <strong>par de calcetines</strong> con diseño de dona</p>\n<p>1 <strong>peluche en forma de pan</strong></p>\n<p>1 <strong>bolígrafo con forma de fruta</strong></p>\n<p>1 <strong>botella isotérmica</strong> (frío/calor) con temática de Snoopy</p>\n<p>1 <strong>block de notas</strong> con forma de galleta o chocolate</p>\n<p>1 <strong>tarjeta estilo casete retro</strong> con la frase BEST WISHES FOR YOU</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "25",
    "reference": "120532",
    "name": "Cuarzo (Unidad)",
    "slug": "brown-bear-vector-graphics",
    "price": 4.132231,
    "stock": 14,
    "categories": [
      CATALOG_CATEGORIES.WELLNESS_SPA
    ],
    "imageIds": [
      42
    ],
    "description": "<p><strong>Cuarzo </strong>de 1,5 × 2 cm (unidad)</p>\n<p>Disponible en <strong>colores variados de manera aleatoria</strong>.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "26",
    "reference": "120533",
    "name": "Set tarjetas motivadoras (3 unidades)",
    "slug": "brown-bear-vector-graphics",
    "price": 0.826446,
    "stock": 114,
    "categories": [
      CATALOG_CATEGORIES.INTERNAL,
      CATALOG_CATEGORIES.CREATIVE_STATIONERY
    ],
    "imageIds": [
      43
    ],
    "description": "<p><strong>Set de tarjetas con frases motivadoras</strong> (3 unidades), ideal para inspirar y acompañar regalos con un toque positivo.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "27",
    "reference": "120535",
    "name": "Mini Libreta",
    "slug": "brown-bear-vector-graphics",
    "price": 4.132231,
    "stock": 12,
    "categories": [
      CATALOG_CATEGORIES.INTERNAL,
      CATALOG_CATEGORIES.CREATIVE_STATIONERY
    ],
    "imageIds": [
      44,
      173,
      174,
      175,
      176
    ],
    "description": "<p><strong>Mini libreta</strong> en diversos estilos (unidad), ideal para notas, creatividad y regalos.</p>\n<p><strong>Estilos disponibles:</strong></p>\n<p><strong>O250520006051:</strong> Happy Bus</p>\n<p><strong>O250520995051:</strong> Espacio Bebé</p>\n<p><strong>O250520895051:</strong> Oso de trabajo</p>\n<p><strong>O250520795051:</strong> Pequeño Astronauta</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "29",
    "reference": "120571",
    "name": "Mini vela  (unidad)",
    "slug": "brown-bear-vector-graphics",
    "price": 4.958678,
    "stock": 6,
    "categories": [
      CATALOG_CATEGORIES.WELLNESS_SPA,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      45
    ],
    "description": "<p><strong>Mini vela de madera con aroma a agar ébano</strong></p>\n<p>Modelo B-2102B, <strong>30 g</strong>, ideal para ambientar espacios con estilo y elegancia.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>\n<p><span style=\"font-family:Calibri;font-size:14.6667px;text-align:center;background-color:#ffffff;\"></span></p>"
  },
  {
    "id": "30",
    "reference": "120534-120541",
    "name": "Bolsa de Bambú",
    "slug": "brown-bear-vector-graphics",
    "price": 0,
    "stock": 10,
    "categories": [
      CATALOG_CATEGORIES.CORPORATE_PACKAGING,
      CATALOG_CATEGORIES.INTERNAL,
    ],
    "imageIds": [
      46,
      83
    ],
    "description": "<p><strong>Bolsas de lona personalizables con logo</strong>, únicas y versátiles, ideales para <strong>eventos, regalos corporativos o uso diario</strong>.</p>\n<p><strong>Tamaños disponibles:</strong></p>\n<p>Pequeña \"S\": 16 × 20 cm </p>\n<p>Mediana \"M\":  20 × 30 cm</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "31",
    "reference": "120507",
    "name": "SPA",
    "slug": "pack-mug-framed-poster",
    "price": 22.31405,
    "stock": 5,
    "categories": [
      CATALOG_CATEGORIES.CUSTOM_BOXES,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      47
    ],
    "description": "<p><strong>BONUS:</strong> Tu caja, tu estilo; combínala y elige <strong>un bonus sorpresa</strong>.</p>\n<p>Los productos se incluyen de forma <strong>aleatoria</strong>, según disponibilidad.</p>\n<p><em>Las imágenes del catálogo son referenciales; colores, modelos y diseños pueden variar según disponibilidad sin previo aviso.</em></p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "32",
    "reference": "120537",
    "name": "Discos desmaquilladores (Unidad)",
    "slug": "brown-bear-vector-graphics",
    "price": 2.479339,
    "stock": 12,
    "categories": [
      CATALOG_CATEGORIES.WELLNESS_SPA,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      50
    ],
    "description": "<p><strong>Discos desmaquilladores</strong> en colores <strong>blanco y negro</strong>, suaves y reutilizables para el cuidado diario de la piel.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "33",
    "reference": "120538",
    "name": "Guacha face",
    "slug": "brown-bear-vector-graphics",
    "price": 2.479339,
    "stock": 4,
    "categories": [
      CATALOG_CATEGORIES.WELLNESS_SPA,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      51
    ],
    "description": "<p><strong>Gua Sha facial</strong>, tamaño <strong>67 × 43 × 4 mm</strong>, ideal para masajes faciales y cuidado de la piel.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "34",
    "reference": "120508",
    "name": "Celebra tus logros",
    "slug": "pack-mug-framed-poster",
    "price": 16.528926,
    "stock": 5,
    "categories": [
      CATALOG_CATEGORIES.CUSTOM_BOXES,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      52,
      53
    ],
    "description": "<p><strong>BONUS:</strong> Tu caja, tu estilo; combínala y elige <strong>un bonus sorpresa</strong>.</p>\n<p>Los productos se incluyen de forma <strong>aleatoria</strong>, según disponibilidad.</p>\n<p><em>Las imágenes del catálogo son referenciales; colores, modelos y diseños pueden variar según disponibilidad sin previo aviso.</em></p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "35",
    "reference": "120539",
    "name": "Pin Motivador",
    "slug": "brown-bear-vector-graphics",
    "price": 4.132231,
    "stock": 16,
    "categories": [
      CATALOG_CATEGORIES.CREATIVE_STATIONERY,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      54
    ],
    "description": "<p><strong>Pin de texto inspirador personalizado</strong>, ideal para expresar motivación y estilo.</p>\n<p><strong>Estilos disponibles:</strong></p>\n<p><strong>O250520375051:</strong> Keep up Good Work</p>\n<p><strong>O250520275051:</strong> Everything will be OK</p>\n<p><strong>O250520175051:</strong> Sweet</p>\n<p><strong>O250520075051:</strong> Good Books</p>\n<p><strong>O250520965051:</strong> Party Time</p>\n<p><strong>O250520865051:</strong> Good Vibes Only</p>\n<p><strong>O250520865051:</strong> Be Nice</p>\n<p><strong>O250520765051:</strong> Best for You</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "36",
    "reference": "120540",
    "name": "Pelota antiestrés",
    "slug": "brown-bear-vector-graphics",
    "price": 1.652893,
    "stock": 14,
    "categories": [
      CATALOG_CATEGORIES.WELLNESS_SPA,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      55
    ],
    "description": "<p><strong>Pelota antiestrés de espuma sólida</strong>, disponible en <strong>figuras deportivas</strong>: béisbol, tenis, baloncesto y fútbol.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "37",
    "reference": "120509",
    "name": "Última Travesura",
    "slug": "customizable-mug",
    "price": 45.454545,
    "stock": 5,
    "categories": [
      CATALOG_CATEGORIES.CUSTOM_BOXES,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      57,
      58
    ],
    "description": "<p>Kit perfecto para despedidas de soltera inolvidables. Diseñado para una noche épica antes del “sí, acepto”, ofrece <strong>diversión, picardía y recuerdos memorables</strong>, activando el <strong>modo fiesta</strong> y celebrando el fin de la soltería con estilo.</p>\n<p><strong>Contenido:</strong></p>\n<p>1 <strong>antifáz</strong> (negro o rojo, aleatorio según disponibilidad)</p>\n<p>1 <strong>gafas temática “Bride to be”</strong> (rosa, blanco o negro, aleatorio según disponibilidad)</p>\n<p>1 <strong>dado erótico</strong> (negro o blanco, aleatorio según disponibilidad)</p>\n<p>1 <strong>vibrador tipo bala</strong> (batería no incluida)</p>\n<p>1 <strong>tanga</strong> (talla única, rojo o negro, aleatorio según disponibilidad)</p>\n<p>1 <strong>tarjeta temática</strong>: “Advertencia: esta BOLSA puede causar calor corporal excesivo”</p>\n<p><strong>Notas:</strong> Las imágenes del catálogo son referenciales; colores, modelos y diseños pueden variar según disponibilidad sin previo aviso.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "38",
    "reference": "120510",
    "name": "Última Noche Libre",
    "slug": "customizable-mug",
    "price": 45.454545,
    "stock": 5,
    "categories": [
      CATALOG_CATEGORIES.CUSTOM_BOXES,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      60,
      59
    ],
    "description": "<p>kit definitivo para el novio y su equipo. Un combo atrevido lleno de <strong>humor, picardía y diversión</strong>, diseñado para convertir cualquier despedida en una experiencia legendaria.</p>\n<p><strong>Contenido:</strong></p>\n<p>1 <strong>set de shots o chupitos</strong> (dos unidades, color negro o blanco, aleatorio según disponibilidad)</p>\n<p>1 <strong>pack de condones</strong></p>\n<p>1 <strong>gafas temática negra “GROOM”</strong></p>\n<p>1 <strong>dado erótico</strong> (negro o blanco, aleatorio según disponibilidad)</p>\n<p>1 <strong>calzoncillo sexy</strong> (negro, talla M, L o XL, aleatorio según disponibilidad)</p>\n<p>1 <strong>tarjeta</strong>: “Advertencia: esta BOLSA puede causar calor corporal excesivo”</p>\n<p><strong>Notas:</strong> Las imágenes del catálogo son referenciales; colores, modelos y diseños pueden variar según disponibilidad sin previo aviso.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "40",
    "reference": "120529",
    "name": "Gafas Happy Birthday",
    "slug": "gafas-my-birthday",
    "price": 4.132231,
    "stock": 150,
    "categories": [
      CATALOG_CATEGORIES.FRIENDSHIP_LOVE,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      65,
      66,
      67,
      68
    ],
    "description": "<p><strong>Gafas de cumpleaños</strong> de <strong>plástico</strong></p>\n<p>Tamaño 10 × 15 × 5 cm, disponibles en <strong>azul, blanco y rosa</strong>.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "41",
    "reference": "120553",
    "name": "Peluche Breakfast (Unidad)",
    "slug": "gafas-my-birthday",
    "price": 14.876033,
    "stock": 11,
    "categories": [
      CATALOG_CATEGORIES.FRIENDSHIP_LOVE,
      CATALOG_CATEGORIES.INTERNAL,
    ],
    "imageIds": [
      73,
      74,
      75,
      76,
      77,
      78,
      79,
      80
    ],
    "description": "<p><strong>Peluche \"Breakfast\"</strong> (unidad), con diseño divertido y <strong>textura suave</strong>, ideal como <strong>almohada abrazable</strong>. Fabricado en una sola pieza con acabados de alta calidad, perfecto para <strong>regalos, decoración o juego</strong>.</p>\n<p><strong>Estilos disponibles:</strong></p>\n<p><strong>O250630331515:</strong> Pretzel (18 × 18 cm)</p>\n<p><strong>O250630821515:</strong> Pan saladito (18 × 18 cm)</p>\n<p><strong>O250630031515:</strong> Sándwich (18 × 18 cm)</p>\n<p><strong>O250630231515:</st…2590 tokens truncated…tilos disponibles:</strong></p>\n<p><strong>O250822176969:</strong> Galleta mordida beige (sabor a crema)</p>\n<p><strong>O250822276969:</strong> Galleta mordida chocolate (sabor a chocolate)</p>\n<p><strong>O250822376969:</strong> Galleta chocolate (sabor a chocolate)</p>\n<p><strong>O250822476969:</strong> Barra de chocolate (sabor a chocolate)</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "59",
    "reference": "120516",
    "name": "Dog Kit",
    "slug": "customizable-mug",
    "price": 16.528926,
    "stock": 5,
    "categories": [
      CATALOG_CATEGORIES.CUSTOM_BOXES,
      CATALOG_CATEGORIES.INTERNAL,
    ],
    "imageIds": [
      142
    ],
    "description": "<p><strong>Dog Kit</strong>: set práctico que reúne los elementos esenciales para el cuidado de tu mascota, de manera <strong>organizada, funcional y sostenible</strong>.</p>\n<p><strong>Contenido:</strong></p>\n<p>1 <strong>packaging de lona</strong> con logo personalizado</p>\n<p>1 <strong>dispensador de bolsas para excremento</strong> eco-friendly</p>\n<p>1 <strong>bolsa biodegradable</strong></p>\n<p>1 <strong>bolsa pequeña de comida</strong> para perros</p>\n<p>1 <strong>peluche puercoespín</strong></p>\n<p><strong>Tarifa especial para empresas por compras superiores a 100 unidades.</strong></p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "60",
    "reference": "120551",
    "name": "Calzoncillo en malla negro",
    "slug": "gafas-my-birthday",
    "price": 7.438017,
    "stock": 9,
    "categories": [
      CATALOG_CATEGORIES.FRIENDS_BACHELORETTE,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      144
    ],
    "description": "<p>Calzoncillo maculino de <strong>malla negro</strong>, divertido, atrevido y cómodo, ideal para <strong>despedidas de soltero</strong> y momentos llenos de diversión.</p>\n<p><strong>Tallas y códigos:</strong></p>\n<p><strong>O250520785051:</strong> Negro M</p>\n<p><strong>O250520685051:</strong> Negro L</p>\n<p><strong>O250520585051:</strong> Negro XL</p>\n<p><strong>Composición:</strong> Fibra de poliéster</p>\n<p><strong>Mantenimiento:</strong> Lavable a mano</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "61",
    "reference": "120543",
    "name": "Antifaz para dormir de seda (unidad)",
    "slug": "gafas-my-birthday",
    "price": 4.958678,
    "stock": 20,
    "categories": [
      CATALOG_CATEGORIES.FRIENDS_BACHELORETTE,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      89,
      86
    ],
    "description": "<p>Accesorios <strong>divertidos y originales</strong> para despedidas de soltera, ideales para <strong>fotos memorables</strong> y celebraciones llenas de estilo.</p>\n<p><strong>Códigos:</strong></p>\n<p><strong>O250520395051:</strong> Marco en perla blanco </p>\n<p><strong>O250520295051:</strong> Marco en perla negro </p>\n<p><strong>O250520095051:</strong> Novia de diamante rosa claro</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "62",
    "reference": "120550",
    "name": "Gafas Groom",
    "slug": "gafas-my-birthday",
    "price": 7.438017,
    "stock": 12,
    "categories": [
      CATALOG_CATEGORIES.FRIENDS_BACHELORETTE,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      151
    ],
    "description": "<p>Gafas <strong>Groom</strong>, divertidas y llamativas, perfectas para <strong>despedidas de soltero</strong> y momentos memorables con estilo.</p>\n<p><strong>Código y color:</strong></p>\n<p><strong>O250520195051:</strong> Gafas de novio negras</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "63",
    "reference": "120544",
    "name": "Dados sexy posturas-12 caras",
    "slug": "customizable-mug",
    "price": 5.785124,
    "stock": 6,
    "categories": [
      CATALOG_CATEGORIES.FRIENDS_BACHELORETTE,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      152
    ],
    "description": "<p><strong>Dados sexy de 12 caras</strong>, ideales para juegos en pareja o en grupo, perfectos para <strong>momentos de diversión y acción</strong>. Versátiles y de alta calidad, son el complemento perfecto para tus partidas o actividades lúdicas.</p>\n<p><strong>Códigos y colores:</strong></p>\n<p><strong>O250520595051:</strong> Dados blancos</p>\n<p><strong>O250520495051:</strong> Dados negros</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "64",
    "reference": "120547",
    "name": "Bolsa cuerina -Small",
    "slug": "brown-bear-vector-graphics",
    "price": 3.305785,
    "stock": 12,
    "categories": [
      CATALOG_CATEGORIES.CORPORATE_PACKAGING,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      154,
      155,
      156
    ],
    "description": "<p><strong>Bolsa de cuerina 11 × 15 cm</strong>, elegante y resistente, ideal para <strong>joyería, accesorios, regalos o empaques premium</strong>. Perfecta para brindar una presentación <strong>sofisticada y profesional</strong> a tus productos.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "65",
    "reference": "120561",
    "name": "Bolsa de merienda para mascotas",
    "slug": "brown-bear-vector-graphics",
    "price": 6.61157,
    "stock": 3,
    "categories": [
      CATALOG_CATEGORIES.INTERNAL,
      CATALOG_CATEGORIES.PETS
    ],
    "imageIds": [
      159,
      160,
      161,
      162
    ],
    "description": "<p><strong>Bolsa multiuso</strong> para merienda, decoración o comida de perros. Resistente y con <strong>cierre clip metálico</strong> que mantiene el contenido fresco.</p>\n<p><strong>Colores disponibles:</strong> verde militar, marrón oscuro y gris.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "66",
    "reference": "120554",
    "name": "Donut gift socks",
    "slug": "brown-bear-vector-graphics",
    "price": 9.090909,
    "stock": 11,
    "categories": [
      CATALOG_CATEGORIES.FRIENDSHIP_LOVE,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      166,
      167,
      168,
      169
    ],
    "description": "<p><strong>Calcetines de algodón de moda</strong>, ideales para las <strong>cuatro estaciones</strong>. Antibacterianos, <strong>antiolores</strong> y <strong>absorbentes del sudor</strong>, con diseño <strong>unisex</strong> apto para niños, hombres y mujeres.</p>\n<p><strong>Talla:</strong> Única</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "67",
    "reference": "120520",
    "name": "Toalla confort para bebé",
    "slug": "customizable-mug",
    "price": 18.181818,
    "stock": 3,
    "categories": [
      CATALOG_CATEGORIES.BABIES_BIRTHS,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      170
    ],
    "description": "<p>Toalla confort para bebé, <strong>suave y acogedora</strong>, ideal para brindar bienestar y acompañar el descanso y el juego diario.</p>\n<p>Producto <strong>sin cambios ni devoluciones</strong></p>"
  },
  {
    "id": "68",
    "reference": "120521",
    "name": "Manta para bebé",
    "slug": "customizable-mug",
    "price": 20.661157,
    "stock": 3,
    "categories": [
      CATALOG_CATEGORIES.BABIES_BIRTHS,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      171
    ],
    "description": "<p><strong>Manta de algodón beige</strong>, 57 × 54 cm</p>\n<p>Suave y absorbente, ideal para brindar <strong>abrigo y confort</strong> después del baño.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "69",
    "reference": "120517-120518-120519",
    "name": "Set bebé 3 piezas: Chupetero,  Sonajero y juego relajante",
    "slug": "customizable-mug",
    "price": 16.528926,
    "stock": 3,
    "categories": [
      CATALOG_CATEGORIES.BABIES_BIRTHS,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      172,
      194
    ],
    "description": "<p>Set diseñado para el confort y la estimulación del bebé.</p>\n<p>Incluye  <strong>chupetero</strong>, <strong>sonajero</strong> y <strong>juego relajante</strong>, ideales para fomentar la calma, la coordinación y el desarrollo sensorial, con materiales seguros y suaves para el bebé.</p>\n<p>Producto <strong>sin cambios ni devoluciones</strong>.</p>"
  },
  {
    "id": "70",
    "reference": "120571",
    "name": "Taza caricatura snoopy",
    "slug": "brown-bear-vector-graphics",
    "price": 16.528926,
    "stock": 2,
    "categories": [
      CATALOG_CATEGORIES.SNOOPY_COLLECTION,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      180
    ],
    "description": "<p><strong>Taza caricatura Snoopy</strong>, con <strong>tapa y asa</strong>, ideal para disfrutar tus bebidas con estilo. Diseño <strong>adorable y funcional</strong>, perfecta para uso diario o como regalo.</p>\n<p><strong>Capacidad:</strong> 500 ml</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>\n<p></p>"
  },
  {
    "id": "71",
    "reference": "120564",
    "name": "Termo Peanuts Snoopy |420ml",
    "slug": "brown-bear-vector-graphics",
    "price": 20.661157,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.SNOOPY_COLLECTION,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      181,
      182
    ],
    "description": "<p><strong>Termo Peanuts Snoopy</strong>, portátil, fabricado en <strong>acero inoxidable 316</strong> con diseño de Snoopy y <strong>aislamiento al vacío</strong>. Mini, ligero y adorable, ideal para llevar tus bebidas a cualquier lugar.</p>\n<p><strong>Capacidad:</strong> 420 ml</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "73",
    "reference": "120570-1",
    "name": "Pantuflas Patata sweet",
    "slug": "brown-bear-vector-graphics",
    "price": 33.057851,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.FRIENDSHIP_LOVE,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      192
    ],
    "description": "<p><strong>Pantuflas cálidas para interiores</strong>, confeccionadas en <strong>algodón y felpa suave</strong>. Diseño creativo y divertido, ideales para el invierno, brindando <strong>comodidad y abrigo</strong>.</p>\n<p><strong>Longitud interior:</strong> 18 cm (adecuada para pies de 17,5 a 18 cm) <br /><strong>Estilo:</strong> Patata adorable<br /><strong>Talla disponible:</strong> 36-37</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "75",
    "reference": "120546",
    "name": "Tanga talla única",
    "slug": "gafas-my-birthday",
    "price": 5.785124,
    "stock": 5,
    "categories": [
      CATALOG_CATEGORIES.FRIENDS_BACHELORETTE,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      197
    ],
    "description": "<p>Tanga <strong>sexy de encaje</strong> para mujer, con <strong>entrepierna abierta</strong> y diseño <strong>transparente</strong>, que combina sensualidad y estilo.</p>\n<p><strong>Talla:</strong> Única<br /><strong>Color disponible:</strong> Rojo</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "76",
    "reference": "120548",
    "name": "Bolsa de terciopelo",
    "slug": "brown-bear-vector-graphics",
    "price": 4.958678,
    "stock": 10,
    "categories": [
      CATALOG_CATEGORIES.CORPORATE_PACKAGING,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      200,
      198
    ],
    "description": "<p>Bolsa de <strong>terciopelo negro 20 × 30 cm</strong>, elegante y resistente, perfecta para <strong>joyería, accesorios, regalos o empaques premium</strong>. Ideal para ofrecer una <strong>presentación sofisticada y profesional</strong> a tus productos.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "77",
    "reference": "120557",
    "name": "Dispensador de bolsas para perros",
    "slug": "dispensador-silicona",
    "price": 3.305785,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.INTERNAL,
      CATALOG_CATEGORIES.PETS
    ],
    "imageIds": [
      201
    ],
    "description": "<p><strong>Dispensador de bolsas para perros, </strong>estilo cápsula con forma de <strong>hueso</strong>, color negro.</p>\n<p>Portátil y práctico, ideal para almacenar y dispensar bolsas de excrementos durante los paseos.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "78",
    "reference": "120573",
    "name": "Placa de identificación para perro",
    "slug": "dispensador-silicona",
    "price": 3.305785,
    "stock": 3,
    "categories": [
      CATALOG_CATEGORIES.INTERNAL,
      CATALOG_CATEGORIES.PETS
    ],
    "imageIds": [
      202
    ],
    "description": "<p><strong>Placa de identificación para perro</strong> en forma de hueso, fabricada en <strong>acero inoxidable</strong>.</p>\n<p>Tamaño <strong>9 × 28 × 1.8 mm</strong>, disponible en <strong>plateado, dorado y negro</strong>.</p>\n<p>Elegante y resistente, perfecta para personalizar el collar de tu mascota.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "79",
    "reference": "120563",
    "name": "Esterilla tipo nido para mascotas",
    "slug": "esterilla-tipo-nido-para-mascotas",
    "price": 0,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.INTERNAL,
      CATALOG_CATEGORIES.PETS
    ],
    "imageIds": [
      203,
      204
    ],
    "description": "<p><strong>Esterilla de esponja para nido de mascotas</strong>, cálida y de felpa, extraíble y lavable, ideal para <strong>invierno</strong> y el confort de <strong>perros y gatos</strong>.</p>\n<p><strong>Tamaños disponibles:</strong></p>\n<p><strong>S:</strong> 48 × 30 × 5 cm</p>\n<p><strong>M:</strong> 58 × 40 × 5 cm</p>\n<p><strong>L:</strong> 73 × 46 × 5 cm</p>\n<p><strong>XL:</strong> 90 × 58 × 5 cm</p>\n<p><strong>XXL:</strong> 105 × 65 × 5 cm</p>\n<p><strong>Color disponible:</strong> gris (otras tallas y colores disponibles <strong>bajo pedido especial-1 mes aprox</strong>)</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "80",
    "reference": "120560",
    "name": "Juguete de felpa para perro",
    "slug": "juguete-de-felpa-para-perro",
    "price": 4.132231,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.FRIENDSHIP_LOVE,
      CATALOG_CATEGORIES.PETS,
      CATALOG_CATEGORIES.INTERNAL,
    ],
    "imageIds": [
      205,
      206
    ],
    "description": "<p><strong>Juguete de felpa para perro</strong> en forma de <strong>puercoespín</strong>, con <strong>simulación de sonido</strong>, resistente a mordeduras y diseñado para <strong>aliviar el estrés y la congestión dental</strong>.</p>\n<p><strong>Color:</strong> gris<br /><strong>Tamaño:</strong> 70 × 45 × 30 mm<br /><strong>Peso:</strong> 25 g</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "81",
    "reference": "120563",
    "name": "Bolsas desechables para mascotas",
    "slug": "juguete-de-felpa-para-perro",
    "price": 0.413223,
    "stock": 2,
    "categories": [
      CATALOG_CATEGORIES.INTERNAL,
      CATALOG_CATEGORIES.PETS
    ],
    "imageIds": [
      208
    ],
    "description": "<p><strong>Bolsas desechables para excremento de perros</strong>, biodegradables y prácticas, ideales para paseos y limpieza responsable de tu mascota.</p>\n<p><strong>Tamaño del rollo:</strong> 60 × 30 mm</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "82",
    "reference": "120565",
    "name": "Termo food grade Snoopy | 420 ml",
    "slug": "botella-food-grade-snoopy-420-ml",
    "price": 20.661157,
    "stock": 3,
    "categories": [
      CATALOG_CATEGORIES.SNOOPY_COLLECTION,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      209,
      210,
      211,
      212
    ],
    "description": "<p><strong>Termo food grade  Snoopy</strong>, práctica y adorable, con <strong>revestimiento aislante de cerámica</strong> que mantiene tus bebidas a la temperatura ideal.</p>\n<p><strong>Tres estilos disponibles:</strong> Snoopy vela, leer y dibujo (sujeto a disponibilidad de stock según estilo)</p>\n<p><strong>Uso:</strong> regalo, doméstico, portátil, aislamiento al vacío<br /><strong>Capacidad:</strong> 420 ml</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "83",
    "reference": "120567",
    "name": "Termo Happiness Snoopy | 500 ml",
    "slug": "termo-happiness-snoopy",
    "price": 30,
    "stock": 3,
    "categories": [
      CATALOG_CATEGORIES.SNOOPY_COLLECTION,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      213,
      214
    ],
    "description": "<p><strong>Termo Happiness  Snoopy</strong>, práctico y adorable, con <strong>revestimiento aislante de cerámica</strong> que mantiene tus bebidas a la temperatura ideal.</p>\n<p><strong>Colores disponibles:</strong> rojo, verde y azul<br /><strong>Capacidad:</strong> 500 ml</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "84",
    "reference": "120568",
    "name": "Termo classic Snoopy |500ml",
    "slug": "termo-classic-snoopy-500ml",
    "price": 24.793388,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.SNOOPY_COLLECTION,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      215,
      216
    ],
    "description": "<p><span style=\"color:#000000;\"><strong>Termo Classic Snoopy</strong>, práctico y encantador, con <strong>diseño de Snoopy</strong> y <strong>aislamiento al vacío</strong> que mantiene tus bebidas a la temperatura ideal. Ligero y portátil, perfecto para acompañarte a cualquier lugar.</span></p>\n<p><span style=\"color:#000000;\"><strong>Capacidad:</strong> 500 ml</span></p>\n<p><span style=\"color:#000000;\"><strong>Producto sin cambios ni devoluciones.</strong></span></p>"
  },
  {
    "id": "85",
    "reference": "120570-2",
    "name": "Pantuflas Cacahuete Sweet",
    "slug": "brown-bear-vector-graphics",
    "price": 33.057851,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.FRIENDSHIP_LOVE,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      218
    ],
    "description": "<p><strong>Pantuflas cálidas para interiores</strong>, confeccionadas en <strong>algodón y felpa suave</strong>. Diseño creativo y divertido, ideales para el invierno, brindando <strong>comodidad y abrigo</strong>.</p>\n<p><strong>Longitud interior:</strong> 18 cm (adecuada para pies de 17,5 a 18 cm) <br /><strong>Estilo:</strong> Patata adorable<br /><strong>Talla disponible:</strong> 40-41</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "42",
    "reference": "120527",
    "name": "Tarjeta de animales adorables",
    "slug": "brown-bear-vector-graphics",
    "price": 2.479339,
    "stock": 9,
    "categories": [
      CATALOG_CATEGORIES.CREATIVE_STATIONERY,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      82
    ],
    "description": "<p><strong>Tarjetas con dibujos adorables</strong>, incluyendo invitaciones de fiesta con animales simpáticos. Cada pieza es única, perfecta para transmitir <strong>alegría y cariño</strong> en cualquier ocasión.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "47",
    "reference": "120530",
    "name": "Tarjeta de cumpleaños feliz",
    "slug": "brown-bear-vector-graphics",
    "price": 4.132231,
    "stock": 15,
    "categories": [
      CATALOG_CATEGORIES.CREATIVE_STATIONERY,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      101,
      102
    ],
    "description": "<p><strong>Tarjeta de cumpleaños feliz</strong> con sobre, diseño colorido y plegable de pastel personalizado.</p>\n<p><strong>Ocasión:</strong> Cumpleaños, Felicidades<br /><strong>Funciones especiales:</strong> Personalizable, tridimensional</p>\n<p><strong>Estilos disponibles:</strong></p>\n<p><strong>120530-01:</strong> Pastel tridimensional</p>\n<p><strong>120530-02:</strong> Pastel corazón tridimensional</p>\n<p><strong>120530-03:</strong> Pastel circular con corazones</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "48",
    "reference": "120558",
    "name": "Tarjetas retro grabables 60 s",
    "slug": "gafas-my-birthday",
    "price": 7.438017,
    "stock": 12,
    "categories": [
      CATALOG_CATEGORIES.CREATIVE_STATIONERY,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      103,
      111,
      112,
      113
    ],
    "description": "<p><strong>Tarjetas de felicitación grabables de estilo retro</strong>, reutilizables y recargables, ideales para <strong>cumpleaños y mensajes personalizados</strong>, combinando <strong>sostenibilidad y creatividad</strong>.</p>\n<p><strong>Estilos disponibles:</strong></p>\n<p><strong>O250822666969:</strong> Grabación de 60 segundos – Rosa</p>\n<p><strong>O250822566969:</strong> Grabación de 60 segundos – Gris</p>\n<p><strong>O250822366969:</strong> Grabación de 60 segundos – Blanco</p>\n<p><strong>O250822466969:</strong> Grabación de 60 segundos – Crema</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "56",
    "reference": "120555",
    "name": "Bolígrafo con diseño de frutas",
    "slug": "brown-bear-vector-graphics",
    "price": 1.652893,
    "stock": 20,
    "categories": [
      CATALOG_CATEGORIES.CREATIVE_STATIONERY,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      133,
      134
    ],
    "description": "<p><strong>Bolígrafo con diseño de frutas</strong>, divertido y creativo, ideal para <strong>uso escolar, oficina o regalos</strong>.</p>\n<p><strong>Estilos disponibles:</strong></p>\n<p><strong>O250822966969:</strong> Bolígrafo Banana Gifts</p>\n<p><strong>O250822076969:</strong> Bolígrafo Sandía Gifts</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "57",
    "reference": "120556",
    "name": "Mini Blocs de Notas Biscuits",
    "slug": "brown-bear-vector-graphics",
    "price": 4.132231,
    "stock": 9,
    "categories": [
      CATALOG_CATEGORIES.CREATIVE_STATIONERY,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      136,
      135
    ],
    "description": "<p><strong>Mini blocs de notas Biscuits</strong> con aroma a chocolate, ideales para <strong>uso escolar, regalos y papelería creativa</strong>.</p>\n<p><strong>Estilos disponibles:</strong></p>\n<p><strong>O250822176969:</strong> Galleta mordida beige (sabor a crema)</p>\n<p><strong>O250822276969:</strong> Galleta mordida chocolate (sabor a chocolate)</p>\n<p><strong>O250822376969:</strong> Galleta chocolate (sabor a chocolate)</p>\n<p><strong>O250822476969:</strong> Barra de chocolate (sabor a chocolate)</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "51",
    "reference": "120523-120524-120525",
    "name": "Set cuidado diario: Trapito apego, babero y  mamila",
    "slug": "customizable-mug",
    "price": 24.793388,
    "stock": 3,
    "categories": [
      CATALOG_CATEGORIES.BABIES_BIRTHS,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      124
    ],
    "description": "<p><strong>Set de tres piezas de algodón</strong> en elegante color <strong>cúrcuma</strong>, suave y delicado con la piel del bebé. Ideal para <strong>uso diario o como regalo</strong>.</p>\n<p><strong>Contenido:</strong></p>\n<p>1 <strong>trapito de apego</strong>, color cúrcuma</p>\n<p>1 <strong>juguete de tela</strong>, color cúrcuma</p>\n<p>1 <strong>babero de tela</strong>, color cúrcuma</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "52",
    "reference": "120526",
    "name": "Pañal de algodón",
    "slug": "customizable-mug",
    "price": 10.743802,
    "stock": 3,
    "categories": [
      CATALOG_CATEGORIES.BABIES_BIRTHS,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      125
    ],
    "description": "<p><strong>Pañal para bebés y niños</strong>, confeccionado en <strong>algodón puro y transpirable</strong> para mantener frescura y comodidad todo el día.</p>\n<p><strong>Edad aplicable:</strong> 6-12 meses (6-11 kg)<br /><strong>Lavable y reutilizable</strong><br /><strong>Talla única:</strong> 22 × 20 cm, con <strong>cintura elástica ajustable</strong> para adaptarse a diferentes tamaños</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "45",
    "reference": "120528",
    "name": "Peluche Cupcake Llavero",
    "slug": "brown-bear-vector-graphics",
    "price": 20.661157,
    "stock": 10,
    "categories": [
      CATALOG_CATEGORIES.FRIENDSHIP_LOVE,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      90,
      91
    ],
    "description": "<p><strong>Peluche Cupcake Llavero</strong>, adorable y práctico, ideal para regalar o complementar tus accesorios favoritos. Perfecto como <strong>detalle decorativo, juguete o regalo</strong>.</p>\n<p><strong>Estilos disponibles:</strong></p>\n<p><strong>O250520026051:</strong> Beige (13 × 16 cm)</p>\n<p><strong>O250520126051:</strong> Verde (13 × 16 cm)</p>\n<p><strong>Mantenimiento:</strong> lavable a mano</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "89",
    "reference": "120589",
    "name": "Set de Cepillo de Bambú",
    "slug": "juguete-de-felpa-para-perro",
    "price": 33.057851,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.WELLNESS_SPA,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      225
    ],
    "description": "<p class=\"isSelectedEnd\">Práctico y original set de cepillo de <strong>bambú pintado</strong>, con un diseño natural y elegante. Ideal para el cuidado personal y como detalle especial.</p>\n<p><strong>No se aceptan cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "46",
    "reference": "120557",
    "name": "Termo Mini Snoopy-280ml",
    "slug": "gafas-my-birthday",
    "price": 20.661157,
    "stock": 10,
    "categories": [
      CATALOG_CATEGORIES.SNOOPY_COLLECTION,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      99,
      98,
      100
    ],
    "description": "<p><strong>Termo Mini Snoopy</strong>, práctica y adorable, con <strong>revestimiento aislante de cerámica</strong> que mantiene tus bebidas a la temperatura ideal.</p>\n<p><strong>Estilos dibujos animados:</strong></p>\n<p><strong>O250822766969:</strong> Snoopy sol</p>\n<p><strong>O250822866969:</strong> Snoopy ondas</p>\n<p><strong>Uso:</strong> regalo, doméstico, portátil, aislamiento al vacío<br /><strong>Capacidad:</strong> 280 ml<br /><strong>Peso:</strong> 300 g</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "93",
    "reference": "120593",
    "name": "Bol Snoopy de Cerámica",
    "slug": "juguete-de-felpa-para-perro",
    "price": 12.396694,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.SNOOPY_COLLECTION,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      229,
      230
    ],
    "description": "<p class=\"isSelectedEnd\">Original bol de cerámica con diseño de <strong>Snoopy</strong>, ideal para el desayuno, snacks o para darle un toque divertido a tu mesa. Perfecto como regalo para cualquier fan de Snoopy.</p>\n<p><br /><strong>No se aceptan cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "90",
    "reference": "120590",
    "name": "Set Bonus Personalizado SPA",
    "slug": "juguete-de-felpa-para-perro",
    "price": 28.92562,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.CUSTOM_BOXES,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      226
    ],
    "description": "<p class=\"isSelectedEnd\">Un detalle especial para disfrutar de un momento de <strong>relax y bienestar</strong>. Personalízalo con tu diseño favorito y conviértelo en un regalo único.</p>\n<p class=\"isSelectedEnd\"><strong>Incluye:</strong> Bolsa de tela personalizada.<br /><strong>Importante:</strong> Envía el diseño que quieras imprimir en la bolsa de tela.</p>\n<p class=\"isSelectedEnd\"><strong>No se aceptan cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "91",
    "reference": "120591",
    "name": "Box Sweet Breakfast ☕💝",
    "slug": "juguete-de-felpa-para-perro",
    "price": 70.247934,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.CUSTOM_BOXES,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      227
    ],
    "description": "<p class=\"isSelectedEnd\">Un delicioso desayuno preparado para sorprender y comenzar el día con un detalle especial. Ideal para cumpleaños, aniversarios o simplemente para regalar un momento bonito.</p>\n<p class=\"isSelectedEnd\"><strong>Incluye:</strong></p>\n<ul>\n<li>🧸 Peluche (a elegir diseño)</li>\n<li>🐶 Mini termo Snoopy</li>\n<li>🍪 Galletas y dulces</li>\n<li>🧦 Calcetines tipo donut</li>\n<li>🍓 Lápiz frutal</li>\n<li>📔 Mini agenda en forma de galleta</li>\n<li>☕ Capuchino</li>\n<li>🍬 Tarro de cristal con dulces</li>\n<li>🎁 Caja decorativa</li>\n<li>💌 Tarjeta grabable</li>\n</ul>\n<p><strong>No se aceptan cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "92",
    "reference": "120592",
    "name": "Box SPA 🌸",
    "slug": "juguete-de-felpa-para-perro",
    "price": 53.719008,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.CUSTOM_BOXES,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      228
    ],
    "description": "<p class=\"isSelectedEnd\">Un regalo pensado para disfrutar de un momento de <strong>relax, bienestar y autocuidado</strong>. Ideal para sorprender y regalar una experiencia especial.</p>\n<p class=\"isSelectedEnd\"><strong>Incluye:</strong></p>\n<ul>\n<li>🐶 Termo Snoopy</li>\n<li>💦 Atomizador facial mini</li>\n<li>🌿 Gua Sha facial</li>\n<li>🕯️ Mini vela</li>\n<li>🎀 Banda para el cabello</li>\n<li>✨ 2 mascarillas faciales</li>\n<li>🧴 Kit de limpieza facial con esponjas</li>\n<li>🎁 Caja rígida decorada</li>\n</ul>\n<p><strong>No se aceptan cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "43",
    "reference": "120545",
    "name": "Vibrador bala",
    "slug": "customizable-mug",
    "price": 12.396694,
    "stock": 5,
    "categories": [
      CATALOG_CATEGORIES.FRIENDS_BACHELORETTE,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      85
    ],
    "description": "<p>Estimulador clitoriano y vaginal para Punto G, ideal para masturbación erótica. Vibrador recargable (batería no incluida) en elegante color negro.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "55",
    "reference": "120552",
    "name": "Set de 7 shots Team Groom",
    "slug": "brown-bear-vector-graphics",
    "price": 5.785124,
    "stock": 2,
    "categories": [
      CATALOG_CATEGORIES.FRIENDS_BACHELORETTE,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      131,
      132
    ],
    "description": "<p>Set de <strong>7 shots Team Groom</strong> en <strong>plástico</strong>, ideal para celebrar con estilo y diversión.</p>\n<p><strong>Códigos y colores:</strong></p>\n<p><strong>O250630631515:</strong> Blanco</p>\n<p><strong>O250630731515:</strong> Negro</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "53",
    "reference": "120522",
    "name": "Caja de regalo plegable",
    "slug": "brown-bear-vector-graphics",
    "price": 8.264463,
    "stock": 38,
    "categories": [
      CATALOG_CATEGORIES.CORPORATE_PACKAGING,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      127
    ],
    "description": "<p>Caja de regalo <strong>plegable y práctica</strong>, ideal para presentar detalles, regalos corporativos y productos especiales.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "99",
    "reference": "120534-120541E",
    "name": "Bolsa de Bambú Personalizada",
    "slug": "brown-bear-vector-graphics",
    "price": 8.264463,
    "stock": 10,
    "categories": [
      CATALOG_CATEGORIES.CORPORATE_PACKAGING,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      238
    ],
    "description": "<p><strong>Bolsa de bambú personalizable</strong>, ideal para regalos corporativos, eventos y detalles únicos con tu diseño o logotipo.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "100",
    "reference": "120599",
    "name": "Almohada de Viaje Personalizada",
    "slug": "brown-bear-vector-graphics",
    "price": 0,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.CORPORATE_PACKAGING,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      241
    ],
    "description": "<p>Almohada de viaje <strong>personalizada</strong>, cómoda y original para acompañar cualquier desplazamiento.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "101",
    "reference": "1205100",
    "name": "Juego Abridor de Vino Portátil",
    "slug": "brown-bear-vector-graphics",
    "price": 8.264463,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.CORPORATE_PACKAGING,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      242
    ],
    "description": "<p>Práctico <strong>juego abridor de vino portátil</strong>, perfecto como detalle, regalo corporativo o accesorio para disfrutar en cualquier ocasión.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "86",
    "reference": "120586",
    "name": "Vaso de Cristal con pétalos amarillos",
    "slug": "termo-classic-snoopy-500ml",
    "price": 8.264463,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.THERMOS_CUPS,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      220
    ],
    "description": "<p>Vaso de cristal decorativo con <strong>pétalos amarillos</strong>, ideal para regalar y disfrutar de tus bebidas favoritas.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "88",
    "reference": "120588",
    "name": "Taza de cristal en forma de flor",
    "slug": "juguete-de-felpa-para-perro",
    "price": 6.61157,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.THERMOS_CUPS,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      224
    ],
    "description": "<p>Taza de cristal con original <strong>forma de flor</strong>, perfecta para servir tus bebidas con un toque especial.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "94",
    "reference": "120594",
    "name": "Taza Happy de Cerámica",
    "slug": "juguete-de-felpa-para-perro",
    "price": 4.958678,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.THERMOS_CUPS,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      231
    ],
    "description": "<p>Taza Happy de <strong>cerámica</strong>, un detalle alegre y práctico para el día a día.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "95",
    "reference": "120595",
    "name": "Set de Termos Divertidos Frutales (x3) 🍋",
    "slug": "juguete-de-felpa-para-perro",
    "price": 16.528926,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.THERMOS_CUPS,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      233
    ],
    "description": "<p>Set de <strong>3 termos divertidos con diseños frutales</strong>, ideal para llevar tus bebidas contigo.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "96",
    "reference": "120596",
    "name": "Mini Batidora Portátil USB",
    "slug": "juguete-de-felpa-para-perro",
    "price": 24.793388,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.THERMOS_CUPS,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      234
    ],
    "description": "<p>Mini batidora portátil con conexión <strong>USB</strong>, práctica para preparar tus bebidas en cualquier lugar.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "97",
    "reference": "120597",
    "name": "Taza de Cerámica + Pintura",
    "slug": "juguete-de-felpa-para-perro",
    "price": 8.264463,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.THERMOS_CUPS,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      235
    ],
    "description": "<p>Taza de cerámica acompañada de pintura para crear un diseño <strong>personalizado y único</strong>.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "98",
    "reference": "120598",
    "name": "Hucha Donut",
    "slug": "juguete-de-felpa-para-perro",
    "price": 12.396694,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.THERMOS_CUPS,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      236,
      237
    ],
    "description": "<p>Hucha con original diseño de <strong>donut</strong>, un accesorio decorativo y divertido para ahorrar.</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "102",
    "reference": "120543",
    "name": "Gafas Bride",
    "slug": "gafas-bride",
    "price": 7.438017,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.FRIENDS_BACHELORETTE,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      61
    ],
    "description": "<p>Accesorios <strong>divertidos y originales</strong> para despedidas de soltera, ideales para <strong>fotos memorables</strong> y celebraciones llenas de estilo.</p>\n<p><strong>Códigos:</strong></p>\n<p><strong>O250520395051:</strong> Marco en perla blanco</p>\n<p><strong>O250520295051:</strong> Marco en perla negro</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  },
  {
    "id": "103",
    "reference": "120543",
    "name": "Gafas Bride to be",
    "slug": "gafas-bride-to-be",
    "price": 7.438017,
    "stock": 1,
    "categories": [
      CATALOG_CATEGORIES.FRIENDS_BACHELORETTE,
      CATALOG_CATEGORIES.INTERNAL
    ],
    "imageIds": [
      62
    ],
    "description": "<p>Accesorios <strong>divertidos y originales</strong> para despedidas de soltera, ideales para <strong>fotos memorables</strong> y celebraciones llenas de estilo.</p>\n<p><strong>Códigos:</strong></p>\n<p><strong>O250520095051:</strong> Novia de diamante rosa claro</p>\n<p><strong>Producto sin cambios ni devoluciones.</strong></p>"
  }
];
