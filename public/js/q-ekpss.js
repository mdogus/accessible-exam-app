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
    qAudioSrc: '/test/audio/q01.mp3',
    oAudioSrc: '/test/audio/o01.mp3'
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
    qAudioSrc: 'audio/q02.mp3',
    oAudioSrc: 'audio/o02.mp3'
};
questionArr[++i] = {
    id: i,
    //3
	text: '<p class="question-stem">Aşağıdakilerin hangisindeki açıklama, parantez içindeki deyim ile anlamca <u>uyuşmamaktadır</u>?</p>',
    o1Text: 'Değişik duyulardan yararlanma' ,
    o2Text: 'Tanımlamalarla söyleyişte yoğunluk sağlama' ,
    o3Text: 'Betimlemeye başvurma' ,
    o4Text: 'Amaç-sonuç cümlesine yer verme' ,
    o5Text: 'Amaç-sonuç cümlesine yer verme' ,
    answer: undefined,
    marked: false,
    qAudioSrc: 'audio/q3.mp3',
    oAudioSrc: 'audio/o3.mp3'
};
questionArr[++i] = {
    id: i,
    text: 'Artık sis daha da bastırmaya başladı. Her yer daha da karanlık. İstanbul’un denizden ilk görüntüsü görkemli diye anlatılır. Şimdi bana dehşet veriyor. İstanbul’un eteklerinde çırpındım yıllarca. Bazen o sisin İstanbul’un eteklerinden kalktığı da oldu. Ama tepesi hiç görünmedi.<br aria-hidden="true"><strong>Bu parça ile ilgili olarak aşağıdakilerden hangisi söylenemez?</strong>',
    o1Text: 'insandan doğaya aktarma yapılmıştır' ,
    o2Text: 'Devrik cümle kullanılmıştır' ,
    o3Text: 'Anlatılanlar gözleme dayalıdır' ,
    o4Text: 'Öyküleme tekniği ile yazılmıştır' ,
    o5Text: 'Öyküleme tekniği ile yazılmıştır' ,
    answer: undefined,
    marked: false,
    qAudioSrc: 'audio/q4.mp3',
    oAudioSrc: 'audio/o4.mp3'
};
questionArr[++i] = {
    id: i,
    text: 'Bir roman yazarken hatıralardan faydalanabilirsiniz. Hangi tarzda, hangi ölçüde faydalanacağınızı tercihlerinize göre belirleyebilirsiniz. Esasen geçmişteki her tecrübe, her gözlem, her tanıklık hatıradır. Bazen yazdıklarınız, yaşadıklarınızdan bile daha gerçek olabilir. Peyami Safa, 9. Hariciye Koğuşu için, “Yaşadığım kısımlar daha gerçek.” diyor. Gerçekliğin yansımaları hayatın akışı içinde kısmen gizli kalabilir yahut arka plana kayabilir. <br aria-hidden="true"><strong>Bu parçanın anlatımında aşağıdakilerden hangilerinden yararlanılmıştır?</strong>',
    o1Text: 'Açıklama - tanık gösterme - benzetme' ,
    o2Text: 'Tartışma - karşılaştırma - tanımlama' ,
    o3Text: 'öyküleme - karşılaştırma - benzetme' ,
    o4Text: 'Açıklama - karşılaştırma - tanık gösterme' ,
    o5Text: 'Açıklama - karşılaştırma - tanık gösterme' ,
    answer: undefined,
    marked: false,
    qAudioSrc: 'audio/q5.mp3',
    oAudioSrc: 'audio/o5.mp3'
};
questionArr[++i] = {
    id: i,
    text: '(I) Başar Başarırın yeni öykü kitabı “Çıktığınız Hevesle İniniz” yazarın on altı yeni öyküsünü okuyucuyla buluşturuyor. <br aria-hidden="true">(II) Başarır, kitabında Türkçenin kaybolmakta olan inceliklerinin peşinden gitmeye çalışıyor. <br aria-hidden="true">(III) Geleneksel öykü kitabı formatına büyük bir yenilik getiren kitapta yer yer gereksiz tekrarlara da düşülmüş. <br aria-hidden="true">(IV) Ayrıca Başarır, “Çıktığınız Hevesle ininiz”de şiirle düz yazıyı etkileyici bir uyumla birleştirmiş. <br aria-hidden="true"><strong>Yukarıda numaralanmış cümlelerin hangisinde sözü edilen eserle ilgili hem olumlu hem olumsuz eleştiri söz konusudur?</strong>' ,
    o1Text: 'I.' ,
    o2Text: 'II.' ,
    o3Text: 'III.' ,
    o4Text: 'IV.' ,
    o5Text: 'IV.' ,
    answer: undefined,
    marked: false,
    qAudioSrc: 'audio/q6.mp3',
    oAudioSrc: 'audio/o6.mp3'
};
questionArr[++i] = {
    id: i,
    text: '(I) Roman, kişisel veya toplumsal bir serüveni anlattığı için tarihe yakın düşer. <br aria-hidden="true">(II) Olaylara bakarken tarih de roman da açıklama ve yorumlama yöntemlerinden yararlanır ancak ortaya çıkan metin farklı olur. <br aria-hidden="true">(III) Farkı yaratan, daha doğrusu romanı tarihten ayıran nokta bakış açısıdır kuşkusuz. (IV) Roman da tarih de gerçeğe bakar ancak tarihçi gerçeğe bakarken nesnel olmak zorundadır. <br aria-hidden="true"><strong>Bu parçada numaralı cümleler için aşağıdakiler-den hangisi söylenmez?</strong>' ,
    o1Text: 'I. cümlede yargı gerekçesiyle verilmiştir.' ,
    o2Text: 'II. cümlede karşılaştırma yapılmıştır.' ,
    o3Text: 'III. cümlede bir tespitte bulunulmuştur.' ,
    o4Text: 'IV. cümlede bir zorunluluktan söz edilmiştir.' ,
    o5Text: 'IV. cümlede bir zorunluluktan söz edilmiştir.' ,
    answer: undefined,
    marked: false,
    qAudioSrc: 'audio/q7.mp3',
    oAudioSrc: 'audio/o7.mp3'
};
questionArr[++i] = {
    id: i,
    text: '(I) Klasik müzik dünyasının önde gelen aktörlerinin yaşamları ve kariyerlerine odaklanan belgesel yapımlara oldum olası özel bir ilgi duymuşumdur. <br aria-hidden="true">(II) Bu insanların sahne dışındaki yaşamları neye benzer, sanat ve kariyerleri hakkında ne düşünürler, meslektaşları ve eleştirmenlerin onlar hakkındaki izlenimleri nasıldır? <br aria-hidden="true">(III) Bu soruların yanıtlarını bulabilmek için izlerim bu tip belgeselleri. (IV) Yazılı söyleşilerde bulamaz mıyım bu soruların yanıtlarını? <br aria-hidden="true"><strong>Bu parçadaki numaralanmış cümlelerle ilgili olarak aşağıda verilenlerden hangisi yanlıştır?</strong>',
    o1Text: 'I. cümlede, kişisel bir özellikten bahsedilmiştir' ,
    o2Text: 'II. cümlede, ele alınan konuyla ilgili sorular sorulmuştur.' ,
    o3Text: 'III. cümlede, yapılan bir davranışın gerekçesi belirtilmiştir.' ,
    o4Text: 'IV. cümlede, söyleşinin işlevinde gerçekleşen bir değişiklik ortaya konmuştur.' ,
    o5Text: 'IV. cümlede, söyleşinin işlevinde gerçekleşen bir değişiklik ortaya konmuştur.' ,
    answer: undefined,
    marked: false,
    qAudioSrc: 'audio/q8.mp3',
    oAudioSrc: 'audio/o8.mp3'
};
questionArr[++i] = {
    id: i,
    text: 'Sıcaktan bunalmış, taze toprağa bulanmış köylüler; arklar, yataklar su ile dolmaya başladığı zaman, büyük bir bayram sevinci duyarlardı. Çocuklar sevinçlerinden bağrışırlar ama en küçükleri ayaklarını suya sokabilir veya kağıttan yapılmış kayıklar yüzdürebi-lirdi. Fakat arklara toprak düşürmemek için dikkat etmek, suyun yolunu kesmemek lazımdı. Kadınlar ve çocuklar, bahçelerde ağaçların altına serilirler ve ıslak, serin havayı zevkle ciğerlerine çekerlerdi. Kat kat örülmüş taş duvarların üzerinden komşu bahçelere hoş sesler yayılırdı.<br aria-hidden="true"><strong>Bu parçanın anlatımında aşağıdakilerden hangisi yoktur?</strong>',
    o1Text: 'Değişik duyulardan yararlanma' ,
    o2Text: 'Tanımlamalarla söyleyişte yoğunluk sağlama' ,
    o3Text: 'Betimlemeye başvurma' ,
    o4Text: 'Amaç-sonuç cümlesine yer verme' ,
    o5Text: 'Amaç-sonuç cümlesine yer verme' ,
    answer: undefined,
    marked: false,
    qAudioSrc: 'audio/q9.mp3',
    oAudioSrc: 'audio/o9.mp3'
};
questionArr[++i] = {
    id: i,
    text: 'Abraham Lincoln, kabineye atanması için önerilen biri hakkında yardımcılarına: “Onun yüzünü hiç beğenmiyorum.” dediğinde, yardımcılarından itiraz sesleri yükselir: “Aman, efendim! insan, yüzüyle doğar, ondan sorumlu tutulamaz ki.” Lincoln, itirazlara şu cümleyle cevap verir: “İnsan, kırkından sonra yüzünden sorumludur.” Lincoln, bu sözüyle insanın doğuştan kazandığı karakterini ve iç dünyasını mecburen yüzüne yansıttığını fakat bunu ——— . <br aria-hidden="true"><strong>Bu parçayı aşağıdakilerden hangisiyle sürdürmek uygun olur?</strong>',
    o1Text: 'anlamanın sezgi gücü gerektirdiğini ortaya koymaktadır.' ,
    o2Text: 'açıkça belli etmenin insana çok şey kaybettirebi-leceği gerçeğini dile getirmektedir.' ,
    o3Text: 'doğuracağı sonuçları hesaba katarak gizlemesi gerektiğini iletmektedir.' ,
    o4Text: 'herkesten başarıyla gizleyebilmesinin hiç de kolay olmadığını anlatmaktadır.' ,
    o5Text: 'herkesten başarıyla gizleyebilmesinin hiç de kolay olmadığını anlatmaktadır.' ,
    answer: undefined,
    marked: false,
    qAudioSrc: 'audio/q10.mp3',
    oAudioSrc: 'audio/o10.mp3'
};
