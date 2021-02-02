var questionArr = [];
var i = 0;


questionArr[++i] = {
    id: i,
    //1
	//text: '<p class="question-text"></p><p class="question-stem"></p>',
    text: '<p class="question-text">“Radyo oyunu” 1920\'lerde ilk kez Batı\'da yayınlanmaya başlamıştır. Bu tür, görsel hiçbir ögeye dayanmaz; dinleyicinin oyunu bütünüyle zihninde canlandırmasına bağlı olarak şekillenir. Radyo oyunu, fiziksel mekân ve zaman gerektirmediğinden, özellikle duygulara hitap eden bölümlerde, sahne oyunlarından çok daha etkili olabilir. Örneğin zaman kaydırmalar, geriye dönüş ve ileriye sıçrama teknikleri, mekân değiştirme, gerçeklik ve düş arasında gidip gelmeler, radyo oyununa kendi boyutlarını kazandırır. Sesin yakından ve doğrudan iletilmesi sayesinde oyun ile dinleyici arasındaki iletişim bağı da hızlıca ve zorlanmadan oluşturulur.</p><p class="question-stem">Bu parçada radyo oyunu ile ilgili olarak aşağıdakilerden hangisine <u>değinilmemiştir</u>?</p>',
    o1Text: 'Konusunun ilgi çekici olaylardan seçildiğine',
    o2Text: 'Görsel oyunlardan üstün özelliklerinin olduğuna',
    o3Text: 'Mekân ve zaman esnekliğinin bulunduğuna',
    o4Text: 'Dinleyicisi ile kolayca etkileşim kurduğuna',
    o5Text: 'Farklı anlatım tekniklerinin kullanıldığına',
    answer: undefined,
    marked: false,
    qAudioSrc: '/test/audio/ekpss/q1.mp3',
    oAudioSrc: '/test/audio/ekpss/o1.mp3'
};
questionArr[++i] = {
    id: i,
    //2
	text: '<p class="question-text">Eski Mısırlılar ve Yunanlılar tarafından keşfedilen ve doğada en belirgin örneklerine insan vücudunda, ağaç dallarında ve küçücük deniz kabuklarında rastlanılan “altın oran”; araştırmacılar tarafından bir dikdörtgenin boyunun enine olan “en estetik” oranı olarak tanımlanmaktadır.</p><p class="question-stem">Bu cümlede aşağıdaki ses olaylarından hangisi <u>yoktur</u>?</p>',
    o1Text: 'Ünlü düşmesi',
    o2Text: 'Ünsüz benzeşmesi',
    o3Text: 'Ünsüz yumuşaması',
    o4Text: 'Ünlü daralması',
    o5Text: 'Ünsüz düşmesi',
    answer: undefined,
    marked: false,
    qAudioSrc: '/test/audio/ekpss/q2.mp3',
    oAudioSrc: '/test/audio/ekpss/o2.mp3'
};
questionArr[++i] = {
    id: i,
    //3
	text: '<p class="question-stem">Aşağıdakilerin hangisindeki açıklama, parantez içindeki deyim ile anlamca <u>uyuşmamaktadır</u>?</p>',
    o1Text: 'İçinden çıkılması güç bir durumda kalmak. (Açmaza düşmek)',
    o2Text: 'Çok iyi bilmek, kesin olarak bilmek. (Adı gibi bilmek)',
    o3Text: 'Bir işin istediği gibi olması için uygun zemin hazırlamak. (Yolunu yapmak)',
    o4Text: 'Durup dinlendirmeden çalıştırmak. (Soluk aldırmamak)',
    o5Text: 'Üzüntü ile derin bir nefes almak. (Göğüs germek)',
    answer: undefined,
    marked: false,
    qAudioSrc: '/test/audio/ekpss/q3.mp3',
    oAudioSrc: '/test/audio/ekpss/o3.mp3'
};
questionArr[++i] = {
    id: i,
    //4
	text: '<p class="question-text">Yapağı adı verilen koyun yününden uzun ve zahmetli bir işleme süreci sonunda üretilen fesin, ibik denen çıkıntısına püskül bağlanırdı. Bu püskülün duruşu, fesi takan kişinin itibarı açısından oldukça önemliydi. İlk zamanlarda bükülmemiş, kalitesiz ipliklerden yapılan püsküller hafif bir rüzgârda darma duman olur ve sahibini maskara ederdi. Bu sebeple fes, halk arasında “püsküllü bela” olarak anılmaya başlandı. Püskülün yarattığı olumsuz durumlar, kısa sürede “püskül tarayıcısı” adında yeni bir sokak mesleğinin doğmasını sağladı. Böylelikle bazı çocuklar sokaklarda, kundura boyacıları gibi, on kuruşa püskül tarayıcılığı yapmaya başladı.</p><p class="question-stem">Bu parçada fes ile ilgili aşağıdakilerden hangisine <u>değinilmemiştir</u>?</p>',
    o1Text: 'Toplumun belli kesimine ekonomik gelir sağladığına',
    o2Text: 'Ham maddesine ve zorlu bir üretim sürecinden geçtiğine',
    o3Text: 'Püskülünün duruşunun, kişinin itibarı üzerinde etkili olduğuna',
    o4Text: 'Kullanan kişinin mesleğini ve toplumsal statüsünü yansıttığına',
    o5Text: 'Yeni bir sokak mesleğinin ortaya çıkmasına sebep olduğuna',
    answer: undefined,
    marked: false,
    qAudioSrc: '/test/audio/ekpss/q4.mp3',
    oAudioSrc: '/test/audio/ekpss/o4.mp3'
};
questionArr[++i] = {
    id: i,
    //5
	text: '<p class="question-text">Cennet kuşları, Avustralya\'nın doğusundan Yeni Gine\'ye uzanan bölgede ve çevre adalarda bulunur. Alçak bataklık arazilerden, deniz düzeyinden üç bin beş yüz metre yukarıdaki bulut ormanlarına kadar çok farklı yüksekliklerde yaşar. Yiyecekleri bol, yaşam alanları çeşitli, avcıları da az olan bu kuşlar, evrim geçirerek çeşitlenmiştir. Boyu on altı santimetreden yüz yirmi beş santimetreye kadar ulaşabilen otuz dokuz türü vardır. Tüylerinin rengi türüne göre geniş bir yelpaze içinde değişiklik gösterir.</p><p class="question-stem">Bu parçada söz edilen cennet kuşlarıyla ilgili olarak aşağıdakilerden hangisine <u>değinilmemiştir</u>?</p>',
    o1Text: 'Yaşam alanlarının bazı niteliklerine',
    o2Text: 'Türlerinin belirli özelliklerine',
    o3Text: 'Zamanla değişime uğradığına',
    o4Text: 'Yiyeceklerini avlanarak elde ettiklerine',
    o5Text: 'Beslenme olanaklarının yeterliliğine',
    answer: undefined,
    marked: false,
    qAudioSrc: '/test/audio/ekpss/q5.mp3',
    oAudioSrc: '/test/audio/ekpss/o5.mp3'
};
questionArr[++i] = {
    id: i,
    //6
	text: '<p class="question-text">Seyit, bir Türk topluluğuyla ilgili yaptığı araştırmada şu bilgilere ulaşmıştır:</p><ul><li><p class="question-text">XI. yüzyılda Bizans ile iyi ilişkiler kurarak Bizans ordusunda paralı askerlik yapmışlardır.</p></li><li><p class="question-text">Malazgirt Savaşı\'nda Selçuklu Devleti\'nin tarafına geçmişlerdir.</p></li><li><p class="question-text">Çaka Bey ile birlikte İstanbul kuşatmasına katılmışlardır.</p></li></ul><p class="question-stem">Buna göre Seyit, aşağıdaki Türk topluluklarından hangisini araştırmıştır?</p>',
    o1Text: 'Bulgarlar',
    o2Text: 'Avarlar',
    o3Text: 'Türgişler',
    o4Text: 'Peçenekler',
    o5Text: 'Kıpçaklar',
    answer: undefined,
    marked: false,
    qAudioSrc: '/test/audio/ekpss/q6.mp3',
    oAudioSrc: '/test/audio/ekpss/o6.mp3'
};
questionArr[++i] = {
    id: i,
    //7
	text: '<p class="question-stem">Doğu vilayetlerinin Ermenilere verilmesini önlemek ve Millî Mücadele\'ye destek vermek amacıyla Erzurum\'da çıkarılan gazete aşağıdakilerden hangisidir?</p>',
    o1Text: 'İrade-i Milliye',
    o2Text: 'Hakimiyet-i Milliye',
    o3Text: 'Albayrak',
    o4Text: 'Açıksöz',
    o5Text: 'Gaye-i Milliye',
    answer: undefined,
    marked: false,
    qAudioSrc: '/test/audio/ekpss/q7.mp3',
    oAudioSrc: '/test/audio/ekpss/o7.mp3'
};
questionArr[++i] = {
    id: i,
    //8
	text: '<p class="question-stem">Aşağıdakilerden hangisi deniz suyundan tuz elde edilen merkezlerden biridir?</p>',
    o1Text: 'Çamaltı (İzmir)',
    o2Text: 'Fatsa (Ordu)',
    o3Text: 'Silifke (Mersin)',
    o4Text: 'Çınarcık (Yalova)',
    o5Text: 'Fethiye (Muğla)',
    answer: undefined,
    marked: false,
    qAudioSrc: '/test/audio/ekpss/q8.mp3',
    oAudioSrc: '/test/audio/ekpss/o8.mp3'
};
questionArr[++i] = {
    id: i,
    //9
	text: '<p class="question-stem">Türkiye Cumhuriyeti Anayasası\'na göre, cumhurbaşkanının yurt dışına çıkarak geçici olarak görevinden ayrılması hâlinde yerine aşağıdakilerden hangisi vekâlet eder?</p>',
    o1Text: 'Türkiye Büyük Millet Meclisi başkanı',
    o2Text: 'Genelkurmay başkanı',
    o3Text: 'İçişleri bakanı',
    o4Text: 'Anayasa Mahkemesi başkanı',
    o5Text: 'Başbakan',
    answer: undefined,
    marked: false,
    qAudioSrc: '/test/audio/ekpss/q9.mp3',
    oAudioSrc: '/test/audio/ekpss/o9.mp3'
};
questionArr[++i] = {
    id: i,
    //10
	text: '<p class="question-stem">Peki Peki Anladık, Ele Güne Karşı, Mazeretim Var Asabiyim Ben ve Güllerin İçinden şarkılarıyla bilinen müzik grubu aşağıdakilerden hangisidir?</p>',
    o1Text: 'Kurtalan Ekspres',
    o2Text: 'Mazhar-Fuat-Özkan',
    o3Text: 'Grup Gündoğarken',
    o4Text: 'Ezginin Günlüğü',
    o5Text: 'Yeni Türkü',
    answer: undefined,
    marked: false,
    qAudioSrc: '/test/audio/ekpss/q10.mp3',
    oAudioSrc: '/test/audio/ekpss/o10.mp3'
};
