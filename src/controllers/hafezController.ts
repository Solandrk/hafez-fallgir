import { Request, Response } from 'express';
import axios from 'axios';

// Mock dataset if API is unavailable
const poems = [
    {
        "poem": "ساقیا برخیز و درده جام را\nخاک بر سر کن غم ایام را\n\nساغر می بر کفم نه تا ز بر\nبرکشم این دلق ازرق فام را\n\nگر چه بدنامیست نزد عاقلان\nما نمی‌خواهیم ننگ و نام را\n\nباده درده چند از این باد غرور\nخاک بر سر نفس نافرجام را\n\nدود آه سینهٔ نالان من\nسوخت این افسردگان خام را\n\nمحرم راز دل شیدای خود\nکس نمی‌بینم ز خاص و عام را\n\nبا دلارامی مرا خاطر خوش است\nکز دلم یک باره برد آرام را\n\nننگرد دیگر به سرو اندر چمن\nهر که دید آن سرو سیم اندام را\n\nصبر کن حافظ به سختی روز و شب\nعاقبت روزی بیابی کام را",
        "meaning": "ای ساقی! برخیز و جام شراب بده تا غم روزگار را فراموش کنم. باده‌ای به من بده تا از این دنیای فریب و غرور رها شوم. آه و دود دل غمگینم، زندگی افسردگان را از بین برده است. در نهایت، حافظ به سختی‌ها صبر کن که روزی به آرزوهایت خواهی رسید.",
        "concept": {
            "interpretation": "این غزل به گذر از سختی‌ها و رهایی از غم و فریب دنیوی اشاره دارد و توصیه می‌کند که با صبر و شکیبایی به آرامش برسیم.",
            "life_lesson": "با پذیرش سختی‌های زندگی و گذشت از نگرانی‌ها می‌توان به خوشبختی و آرامش دست یافت."
        },
        "ai_opinion": "غزلی عمیق با پیام صبر و شکیبایی در برابر سختی‌های زندگی و رهایی از دنیاپرستی."
    },
    {
        "poem": "ما ز یاران چشم یاری داشتیم\nخود غلط بود آنچه می‌پنداشتیم\n\nتا درخت دوستی برگی دهد\nحالیا رفتیم و تخمی کاشتیم\n\nگفت و گو آیین درویشی نبود\nور نه با تو ماجراها داشتیم\n\nشیوهٔ چشمت فریب جنگ داشت\nما غلط کردیم و صلح انگاشتیم\n\nگفت خود دادی به ما دل حافظا\nما محصل بر کسی نگماشتیم",
        "meaning": "ما از دوستان انتظار حمایت داشتیم اما این انتظار اشتباه بود. حالا که درخت دوستی از بین رفته، ما دانه‌ای کاشته‌ایم تا از نو شروع کنیم. درویشی نیازی به بحث ندارد و اگر لازم بود، ما هم چیزهای زیادی برای گفتن داشتیم.",
        "concept": {
            "interpretation": "این غزل به اهمیت بازنگری در دوستی‌ها و ارتباطات اشاره دارد و توصیه می‌کند که بر مبنای تجربه، روابط جدیدی بسازیم.",
            "life_lesson": "زندگی فرصت تازه‌ای است برای بازسازی روابط و ایجاد دوستی‌های واقعی."
        },
        "ai_opinion": "توصیه‌ای به ایجاد روابط جدید با نگاه به تجربه‌های گذشته."
    },
    {
        "poem": "دل می‌رود ز دستم صاحب دلان خدا را\nدردا که راز پنهان خواهد شد آشکارا\n\nکشتی شکستگانیم ای باد شُرطت برخیز\nباشد که بازبینیم دیدار آشنا را\n\nده روزه مهر گردون افسانه است و افسون\nنیکی به جای یاران فرصت شمار یارا\n\nدر حلقهٔ گل و مل خوش خواند دوش بلبل\nهات الصبوح هبوا یا ایها السکارا\n\nای صاحب کرامت شکرانهٔ سلامت\nروزی تفقدی کن درویش بی‌نوا را\n\nآسایش دو گیتی تفسیر این دو حرف است\nبا دوستان مروت با دشمنان مدارا\n\nدر کوی نیک نامی ما را گذر ندادند\nگر تو نمی‌پسندی تغییر کن قضا را\n\nحافظ جناب پیر مغان جای دولت است\nمن ترک خاکبوسی سجادهٔ صفا را",
        "meaning": "ای صاحب دلان! دل من از دست می‌رود. رازهای نهفته‌ای که داشتم، آشکار خواهد شد. زندگی کوتاه است و مهر دنیا ناپایدار، پس نیکی به دوستان را غنیمت بدان. در حلقه گل‌ها، بلبل با خوشی آواز خواند و ما را به بیداری و نشاط دعوت کرد. آسایش دنیا و آخرت در این است که با دوستانت مهربان باشی و با دشمنانت مدارا کنی.",
        "concept": {
            "interpretation": "این غزل به ارزش دوستی و مدارا با دیگران اشاره دارد و زندگی را به گذرا بودن و نیکی کردن محدود می‌کند.",
            "life_lesson": "در زندگی با دوستانت خوش‌رفتاری کن و در برابر سختی‌ها مدارا داشته باش."
        },
        "ai_opinion": "پیامی پر از درس‌های زندگی برای رفتار با دیگران."
    },
    {
        "poem": "صوفی از پرتو می راز نهانی دانست\nگوهر هر کس از این لعل توانی دانست\n\nقدر مجموعه گل مرغ سحر داند و بس\nکه نه هر کو ورقی خواند معانی دانست\n\nعرضه کردم دو جهان بر دل کارافتاده\nبجز از عشق تو باقی همه فانی دانست\n\nدلبر آن است که باشد غم دل با وی یار\nدلبر آن است که جانانهٔ جانی دانست\n\nجان عاشق همه در کوی تواست ای ساقی\nدل نگران تو شد دلبر جانی دانست",
        "meaning": "صوفی با کمک شراب رازهای پنهان را کشف کرد و ارزش افراد را شناخت. تنها کسی که به عمق موضوعات پی برده باشد، می‌تواند معنای واقعی را درک کند. عشق، ارزش جاودانه‌ای است که در دل کارافتاده جای گرفته است.",
        "concept": {
            "interpretation": "این غزل درباره ارزش عشق و معنای واقعی زندگی صحبت می‌کند که تنها افراد عمیق آن را می‌فهمند.",
            "life_lesson": "به ارزش‌های عمیق‌تر زندگی توجه کن و عشق را در مرکز توجه خود قرار بده."
        },
        "ai_opinion": "تاکیدی بر اهمیت عشق و معنای حقیقی آن در زندگی."
    },
    {
        "poem": "بیا که قصر امل سخت سست بنیاد است\nبیار باده که بنیاد عمر بر باد است\n\nغلام همت آنم که زیر چرخ کبود\nز هر چه رنگ تعلق پذیرد آزاد است\n\nچه گویمت که به میخانه دوش مست و خراب\nسروش عالم غیبم چه مژده‌ها داد است\n\nکه ای بلندنظر شاهباز سدره نشین\nنشیمن تو نه این کنج محنت آباد است\n\nتو را ز کنگره عرش می‌زنند صفیر\nندانمت که در این دامگه چه افتاد است",
        "meaning": "بیا که این دنیا و آرزوهایش ناپایدار است. بیا تا از شراب لذت ببریم چرا که عمر کوتاه و بر باد است. من بندهٔ کسی هستم که از وابستگی‌های دنیوی آزاد است. دیشب در میخانه، پیام‌آوری از عالم غیب به من مژده داد که جایگاه اصلی تو در عرش است و این دنیا جای تو نیست.",
        "concept": {
            "interpretation": "این غزل به ناپایداری دنیا و ارزش آزادی از تعلقات دنیوی اشاره دارد و یادآور می‌شود که جایگاه انسان بالاتر از این جهان است.",
            "life_lesson": "با رها کردن وابستگی‌های دنیوی می‌توان به جایگاه والاتری دست یافت."
        },
        "ai_opinion": "تاکیدی بر زودگذر بودن دنیا و اهمیت معنویت و آزادی."
    },
    {
        "poem": "هر که شد محرم دل در حرم یار بماند\nو آن که این کار ندانست در انکار بماند\n\nاگر از پرده برون شد دل من عیب مکن\nشکر ایزد که نه در پرده پندار بماند\n\nصوفی و عارف از این بادیه دور افتادند\nجام می گیر که عمرت ز پی کار بماند\n\nبعد از این دست من و دامن سرو و لب جوی\nخاصه اکنون که صبا مژده گلزار بماند\n\nگوشه چشم رضایی به منت دار ای دوست\nکه دگر گوشه چشمم به کسی کار بماند",
        "meaning": "هر کسی که به اسرار دل راه پیدا کرد، نزد یار باقی ماند و کسی که این کار را نفهمید، در انکار گرفتار شد. اگر راز دل من آشکار شد، عیب مگیر چرا که خدا را شکر دیگر در پردهٔ خیال و پندار نیست. صوفیان و عارفان در این مسیر گمراه شدند؛ پس جام شراب بگیر تا عمرت در انجام کارهای بیهوده هدر نرود.",
        "concept": {
            "interpretation": "این غزل به اهمیت شناخت اسرار دل و دوری از پندار و خیالات پوچ اشاره دارد.",
            "life_lesson": "زندگی کوتاه است؛ وقت خود را صرف امور بیهوده نکن و به دنبال حقیقت باش."
        },
        "ai_opinion": "پیامی برای جستجوی حقیقت و دوری از توهمات."
    },
    {
        "poem": "ای دل مباش یک دم خالی ز عشق و مستی\nوان گه برو که رستی از نیستی و هستی\n\nبا عقل اگر براهی دوری ز راه عشاق\nزنهار تا نیفتی چون رهروی به شستی\n\nاز چشم خود بپرسید در کوی عشق بازان\nاین دیده داند اکنون که از کجا نشست",
        "meaning": "ای دل! هیچ‌گاه خود را از عشق و مستی خالی نکن؛ زیرا تنها آن زمان است که از نیستی و هستی می‌رهی. اگر بخواهی با عقل مسیر عشق را طی کنی، از مسیر واقعی عشق دور می‌شوی.",
        "concept": {
            "interpretation": "عشق کلید رهایی از قیود دنیا و مسیر به سوی حقیقت است.",
            "life_lesson": "عشق حقیقی را به عنوان مسیر اصلی زندگی بپذیر."
        },
        "ai_opinion": "توصیه‌ای به تجربه عشق به عنوان راه اصلی."
    },
    {
        "poem": "ای دل مباش یک دم خالی ز عشق و مستی\nوان گه برو که رستی از نیستی و هستی\n\nبا عقل اگر براهی دوری ز راه عشاق\nزنهار تا نیفتی چون رهروی به شستی\n\nاز چشم خود بپرسید در کوی عشق بازان\nاین دیده داند اکنون که از کجا نشست",
        "meaning": "ای دل! هیچ‌گاه خود را از عشق و مستی خالی نکن؛ زیرا تنها آن زمان است که از نیستی و هستی می‌رهی. اگر بخواهی با عقل مسیر عشق را طی کنی، از مسیر واقعی عشق دور می‌شوی.",
        "concept": {
            "interpretation": "عشق کلید رهایی از قیود دنیا و مسیر به سوی حقیقت است.",
            "life_lesson": "عشق حقیقی را به عنوان مسیر اصلی زندگی بپذیر."
        },
        "ai_opinion": "توصیه‌ای به تجربه عشق به عنوان راه اصلی."
    },
    {
        "poem": "چو بید بر سر ایمان خویش می‌لرزم\nکه دل به دست کمان ابرویی است کافر کیش\n\nز آستین طبیبان هزار خون چکد\nگرم به تجربه دستی نهند بر دل ریش",
        "meaning": "مانند بید بر سر ایمانم می‌لرزم زیرا دلم به دست معشوقی کافر افتاده است. حتی طبیبان نیز اگر دست بر دل زخمی‌ام بگذارند، از آن هزاران خون جاری می‌شود.",
        "concept": {
            "interpretation": "غزل نشان‌دهنده شدت عشق و تأثیر آن بر دل عاشق است.",
            "life_lesson": "دل به دست هر معشوقی نسپار زیرا ممکن است تو را در رنج و سختی قرار دهد."
        },
        "ai_opinion": "تأکیدی بر تأثیر عمیق عشق بر ایمان و روان انسان."
    },
    {
        "poem": "سحر بلبل حکایت با صبا کرد\nکه عشق روی گل با ما چه‌ها کرد\n\nاز آن رنگ رخم خون در دل افتاد\nو از این گلشن به خارم مبتلا کرد",
        "meaning": "صبح هنگام، بلبل با نسیم صبح از ماجراهای عشق به گل سخن گفت. رنگ چهره معشوق، دلم را پر از درد و غم کرد و مرا گرفتار خارهای گلزار عشق نمود.",
        "concept": {
            "interpretation": "غزل نشان‌دهنده لطافت و در عین حال سختی‌های عشق است.",
            "life_lesson": "عشق می‌تواند زیبا باشد اما با خود سختی‌ها و دردهایی نیز به همراه دارد."
        },
        "ai_opinion": "شرح زیبایی و دردهای همزمان عشق."
    },
    {
        "poem": "چشم جادوی تو خود عین سواد سحر است\nدل ربایی همه آن و دل آزاری این",
        "meaning": "چشم جادویی تو عین جادوی واقعی است؛ همه دلربایی‌ها از تو سرچشمه می‌گیرد و دل‌آزاری نیز از آن جدا نیست.",
        "concept": {
            "interpretation": "عشق و دلربایی با دل‌آزاری همراه است و این دو را نمی‌توان از هم جدا کرد.",
            "life_lesson": "زیبایی و جادوی عشق ممکن است دل‌آزاری را نیز به همراه داشته باشد."
        },
        "ai_opinion": "تأملی در تناقضات زیبایی عشق و سختی‌های آن."
    },
    {
        "poem": "ز خاک کعبه گل کوزه‌ها کنند امروز\nبه یاد خم می و جام‌ها کنند امروز",
        "meaning": "از خاک کعبه امروز گل کوزه‌ها ساخته می‌شود و یادآور جام‌ها و شراب‌های عشق است.",
        "concept": {
            "interpretation": "غزل به ارتباط بین عناصر معنوی و مادی در عشق اشاره دارد.",
            "life_lesson": "عشق می‌تواند بین جهان مادی و معنوی پلی برقرار کند."
        },
        "ai_opinion": "نشان‌دهنده اتحاد بین مادیات و معنویات در عشق."
    },
    {
        "poem": "یاری اندر کس نمی‌بینیم یاران را چه شد؟\nدوستی کی آخر آمد دوستداران را چه شد؟",
        "meaning": "هیچ کس به یاری نمی‌آید، یاران کجا هستند؟ دوستی و محبت کی به پایان رسید؟ دوستداران کجا رفتند؟",
        "concept": {
            "interpretation": "این غزل نشان‌دهنده گله‌مندی از نبود محبت و دوستی در میان افراد است.",
            "life_lesson": "ارزش دوستی و محبت را بدانیم و از آن مراقبت کنیم."
        },
        "ai_opinion": "بیان اندوه از کمبود دوستی و محبت در زندگی."
    },
    {
        "poem": "شاهد آن نیست که مویی و میانی دارد\nبنده طلعت آن باش که آنی دارد",
        "meaning": "معشوق حقیقی کسی نیست که فقط ظاهر زیبایی دارد، بلکه کسی است که ویژگی‌های درونی ارزشمندی دارد.",
        "concept": {
            "interpretation": "زیبایی درونی و شخصیت ارزشمندتر از ظاهر زیبا است.",
            "life_lesson": "به جای ظاهر، به ارزش‌های درونی افراد توجه کن."
        },
        "ai_opinion": "تأکیدی بر اهمیت زیبایی درونی در برابر ظاهر."
    },
    {
        "poem": "هر آن که جانب اهل وفا نگه دارد\nخداش در همه حال از بلا نگه دارد",
        "meaning": "هر کس که به وفاداری اهمیت دهد و از افراد وفادار حمایت کند، خداوند او را از بلاها محفوظ خواهد داشت.",
        "concept": {
            "interpretation": "وفاداری و حمایت از وفاداران، موجب حفاظت الهی می‌شود.",
            "life_lesson": "وفاداری کلید امنیت و آرامش است."
        },
        "ai_opinion": "توصیه به وفاداری و ارزش آن در زندگی."
    },
    {
        "poem": "غلام همت آنم که زیر چرخ کبود\nز هر چه رنگ تعلق پذیرد آزاد است",
        "meaning": "من بنده کسی هستم که از هر چه که رنگ وابستگی و دنیوی دارد، آزاد باشد.",
        "concept": {
            "interpretation": "آزادی از وابستگی‌های دنیوی نشان‌دهنده شخصیت والاست.",
            "life_lesson": "آزادگی و رهایی از تعلقات، ارزشمندترین ویژگی انسان است."
        },
        "ai_opinion": "تأکیدی بر ارزش رهایی و آزادگی."
    },
    {
        "poem": "چرا نه در پی عزم دیار خود باشم؟\nچرا نه خاک سر کوی یار خود باشم؟",
        "meaning": "چرا در پی رفتن به دیار خودم نباشم؟ چرا خاک پای معشوق خود نباشم؟",
        "concept": {
            "interpretation": "بازگشت به اصل و عشق به معشوق حقیقی مورد توجه است.",
            "life_lesson": "به اصل خود و عشق حقیقی بازگرد."
        },
        "ai_opinion": "تشویق به بازگشت به اصل و ارزش‌های حقیقی."
    },
      {
        "poem": "دوش وقت سحر از غصه نجاتم دادند\nو اندر آن ظلمت شب آب حیاتم دادند\n\nچه مبارک سحری بود و چه فرخنده شبی\nآن شب قدر که این تازه براتم دادند",
        "meaning": "در سحرگاه، از غم رهایی یافتم و در تاریکی شب، آب حیات به من دادند. چه سحر مبارک و شب فرخنده‌ای که در آن شب قدر، بخشش و نجات به من عطا شد.",
        "concept": {
            "interpretation": "غزل به لطف الهی و دریافت بخشش در شب قدر اشاره دارد.",
            "life_lesson": "در لحظات سخت، امید به لطف الهی داشته باش و بر شب‌های مقدس تمرکز کن."
        },
        "ai_opinion": "تاکیدی بر اهمیت شب قدر و لطف الهی در زندگی."
    },
    {
        "poem": "اگر آن ترک شیرازی به دست آرد دل ما را\nبه خال هندویش بخشم سمرقند و بخارا را\n\nبده ساقی می باقی که در جنت نخواهی یافت\nکنار آب رکن آباد و گلگشت مصلا را",
        "meaning": "اگر آن معشوق شیرازی دل ما را به دست آورد، حتی شهرهای بزرگی چون سمرقند و بخارا را به خال زیبایش می‌بخشم. ای ساقی، شراب باقی بیاور که حتی در بهشت نیز زیبایی رکن آباد و مصلا را نخواهی یافت.",
        "concept": {
            "interpretation": "این غزل به ارزش عشق و زیبایی اشاره دارد که حتی از بزرگ‌ترین دارایی‌ها نیز گرانبهاتر است.",
            "life_lesson": "عشق حقیقی را بالاتر از هر دارایی مادی بدان."
        },
        "ai_opinion": "بیانی از ارزش والای عشق و زیبایی در زندگی."
    },
    {
        "poem": "به ملازمان سلطان که رساند این دعا را\nکه به شکر پادشاهی ز نظر مران گدا را\n\nز رقیب دیوسیرت به خدای خود پناهم\nمگر آن شهاب ثاقب مددی دهد خدا را",
        "meaning": "به همراهان سلطان بگویید این دعا را برسانند که گدا را به خاطر پادشاهی از نظر دور نکنند. از رقیب بدطینت به خدا پناه می‌برم تا شاید کمک الهی مرا یاری دهد.",
        "concept": {
            "interpretation": "این غزل به دعا و امید به لطف الهی در برابر دشمنان اشاره دارد.",
            "life_lesson": "در مشکلات و سختی‌ها، امیدت را به خدا حفظ کن."
        },
        "ai_opinion": "تاکیدی بر دعا و توکل در مواجهه با سختی‌ها."
    },
    {
        "poem": "صبا به لطف بگو آن غزال رعنا را\nکه سر به کوه و بیابان تو داده‌ای ما را\n\nشکرفروش که عمرش دراز باد چرا\nتفقدی نکند طوطی شکرخا را",
        "meaning": "ای نسیم صبح، به آن معشوق زیبای من بگو که تو ما را به کوه و بیابان کشانده‌ای. چرا آن فروشنده شکر، که عمرش طولانی باد، از طوطی شکرخوار غافل است؟",
        "concept": {
            "interpretation": "این غزل به شکایت از بی‌وفایی معشوق و امید به لطف او اشاره دارد.",
            "life_lesson": "از معشوقت انتظار توجه داشته باش، اما در سختی‌ها صبور باش."
        },
        "ai_opinion": "شرحی از دلدادگی و شکایت از بی‌مهری معشوق."
    },
    {
        "poem": "الا یا ایها الساقی ادر کاسا و ناولها\nکه عشق آسان نمود اول ولی افتاد مشکل‌ها\n\nبه بوی نافه‌ای کاخر صبا زان طره بگشاید\nز تاب جعد مشکینش چه خون افتاد در دل‌ها",
        "meaning": "ای ساقی، جام شراب را بچرخان و به من بده، که عشق در ابتدا آسان به نظر می‌رسید، اما مشکلات زیادی به همراه داشت. به امید آن که نسیم صبح، گره‌ای از زلف معشوق باز کند، دلدادگان بسیاری از تاب زلف مشکین او در رنج افتادند.",
        "concept": {
            "interpretation": "این غزل به سختی‌های عشق و امید به لطف معشوق اشاره دارد.",
            "life_lesson": "عشق با مشکلات همراه است، اما امیدت را حفظ کن."
        },
        "ai_opinion": "بیانی از سختی‌ها و زیبایی‌های عشق."
    },
    {
        "poem": "مزرع سبز فلک دیدم و داس مه نو\nیادم از کشته خویش آمد و هنگام درو\n\nگفتم ای بخت بخسبیدی و خورشید دمید\nگفت با این همه از سابقه نومید مشو",
        "meaning": "آسمان سبز را دیدم و ماه نو که همچون داسی بود، به یاد اعمال خودم و زمان برداشت آن افتادم. گفتم: ای بخت، چرا خوابیدی و خورشید طلوع کرد؟ بخت پاسخ داد: با این حال، از لطف الهی ناامید مشو.",
        "concept": {
            "interpretation": "این غزل به تأمل در اعمال گذشته و امید به رحمت الهی اشاره دارد.",
            "life_lesson": "به اعمالت توجه کن، اما هرگز از لطف الهی ناامید نشو."
        },
        "ai_opinion": "دعوت به تأمل در اعمال و حفظ امیدواری."
    },
    {
        "poem": "دل می‌رود ز دستم صاحب دلان خدا را\nدردا که راز پنهان خواهد شد آشکارا\n\nکشتی شکستگانیم ای باد شرطه برخیز\nباشد که بازبینیم دیدار آشنا را",
        "meaning": "ای صاحبان دل، دل من از دست می‌رود. افسوس که راز پنهانی ما آشکار خواهد شد. ای باد موافق، برخیز تا شاید دوباره دیدار معشوقمان را ببینیم.",
        "concept": {
            "interpretation": "این غزل به دلدادگی و امید به دیدار معشوق اشاره دارد.",
            "life_lesson": "در عشق صبور باش و امید به دیدار را حفظ کن."
        },
        "ai_opinion": "توصیه‌ای به امیدواری در عشق."
    },
    {
        "poem": "شب وصل است و طی شد نامه هجر\nسلام فیه حتی مطلع الفجر\n\nدلا در عاشقی ثابت قدم باش\nکه در این ره نباشد کار بی اجر",
        "meaning": "شب وصال فرا رسیده و دوران فراق به پایان رسیده است، مانند سلامی که تا سپیده دم ادامه دارد. ای دل، در مسیر عشق ثابت قدم باش، چرا که در این مسیر هیچ تلاشی بی‌پاداش نیست.",
        "concept": {
            "interpretation": "این غزل به پایان فراق و اهمیت پایداری در عشق اشاره دارد.",
            "life_lesson": "در مسیر عشق صبور و پایدار باش، پاداش آن را خواهی دید."
        },
        "ai_opinion": "تأکیدی بر پایداری و صبر در عشق."
    },
    {
        "poem": "هرگزم نقش تو از لوح دل و جان نرود\nهرگز از یاد من آن سرو خرامان نرود\n\nاز دماغ من سرگشته خیال دهنت\nبه جفای فلک و غصه دوران نرود",
        "meaning": "هرگز تصویر تو از دل و جان من پاک نخواهد شد. هرگز آن معشوق زیبا از یاد من نخواهد رفت. فکر و خیال لبان تو حتی با سختی‌های روزگار از ذهن من دور نخواهد شد.",
        "concept": {
            "interpretation": "این غزل به ماندگاری عشق و یاد معشوق در دل عاشق اشاره دارد.",
            "life_lesson": "عشق حقیقی هیچ‌گاه از دل پاک نمی‌شود."
        },
        "ai_opinion": "بیانی از جاودانگی عشق در دل عاشق."
    },
    {
        "poem": "ساقیا برخیز و درده جام را\nخاک بر سر کن غم ایام را\n\nساغر می بر کفم نه تا ز بر\nبرکشم این دلق ازرق فام را",
        "meaning": "ای ساقی، برخیز و جام شراب را به من بده تا غم روزگار را فراموش کنم. جام را به دستم بده تا این لباس آبی‌رنگ را از تن درآورم.",
        "concept": {
            "interpretation": "این غزل به دعوت به شادی و رهایی از غم‌ها اشاره دارد.",
            "life_lesson": "غم‌ها را رها کن و لحظات شاد زندگی را دریاب."
        },
        "ai_opinion": "توصیه‌ای به شادی و رهایی از غم‌های زندگی."
    },
    {
        "poem": "حجاب چهره جان می‌شود غبار تنم\nخوشا دمی که از این چهره پرده برفکنم\n\nچنین قفس نه سزای چو من خوش الحانی است\nروم به گلشن رضوان که مرغ آن چمنم",
        "meaning": "تن به عنوان غباری بر چهره جان است و آرزو دارم که از این قفس جسم رهایی یابم و به گلشن الهی بروم، جایی که شایستهٔ روح من است.",
        "concept": {
            "interpretation": "این غزل به آرزوی رهایی از محدودیت‌های جسمانی و رسیدن به جایگاه روحانی اشاره دارد.",
            "life_lesson": "رهایی از تعلقات دنیوی و توجه به ارزش‌های والای روحانی را هدف خود قرار ده."
        },
        "ai_opinion": "بیانی از اشتیاق به رهایی و تعالی روح."
    },
    {
        "poem": "به یاد روی دوست و جام می\nبه خوشحالی گذر کن غم‌های نی\n\nچنان مستم که در دل جای غم نیست\nزین می که ساقی داد ما را مهستی",
        "meaning": "با یادآوری دوست و جام شراب، لحظات را با شادی بگذران و غم‌ها را فراموش کن. این مستی نشان از شوق دل به حضور دلدار دارد.",
        "concept": {
            "interpretation": "این غزل به اهمیت شادی و یادآوری لحظات خوب با یاری الهام‌بخش اشاره می‌کند.",
            "life_lesson": "در لحظات چالش، بر حضور دوست و تأمل زیستی بنا بر پیوندها بنا کن."
        },
        "ai_opinion": "بیانی از شوق دل و ارزش لحظات خوش."
    },
    {
        "poem": "صوفی از پرتو می راز نهانی دانست\nگوهر هر کس از این لعل توانی دانست\n\nقدر مجموعه گل مرغ سحر داند و بس\nکه نه هر کو ورقی خواند معانی دانست",
        "meaning": "صوفی با کمک شراب رازهای پنهان را کشف کرد و ارزش افراد را شناخت. تنها کسی که به عمق موضوعات پی برده باشد، می‌تواند معنای واقعی را درک کند.",
        "concept": {
            "interpretation": "غزل درباره ارزش فهم عمیق و جستجوی حقیقت صحبت می‌کند.",
            "life_lesson": "به جای قضاوت سطحی، ارزش‌ها و عمق مسائل را بشناس."
        },
        "ai_opinion": "تاکید بر اهمیت درک عمق و حقیقت."
    },
    {
        "poem": "دل ما به دور رویت ز چمن فراغ دارد\nکه چو سرو پایبند است و چو لاله داغ دارد\n\nز بنفشه تاب دارم که ز زلف او زند دم\nتو سیاه کم نبینی که چنین فراغ دارد",
        "meaning": "دل من به خاطر روی زیبای تو از چمن بی‌نیاز است، زیرا مانند سرو محکم است و مانند لاله زخمی دارد. بنفشه از زلف تو می‌گوید و چنین داستانی از غم و عشق نمایان می‌شود.",
        "concept": {
            "interpretation": "این غزل به تاثیر عشق بر دل عاشق اشاره دارد که تمام احساسات او را دربر می‌گیرد.",
            "life_lesson": "عشق می‌تواند همه چیز را در زندگی تغییر دهد."
        },
        "ai_opinion": "توصیفی از تأثیر عشق و زیبایی معشوق."
    },
    {
        "poem": "بخت بازآید از آن در که یکی چون تو درآید\nروی میمون تو دیدن در دولت بگشاید\n\nدوستت دارم و دانم که تویی دشمن جانم\nاز چه با دشمن جان دوست داشتن نشاید",
        "meaning": "بخت و اقبال از دری وارد می‌شود که کسی مانند تو از آن در بیاید. دیدن روی تو دری به سوی خوشبختی باز می‌کند. دوستت دارم، حتی اگر دشمن جان من باشی، چرا که عشق به دشمن جان نیز زیباست.",
        "concept": {
            "interpretation": "این غزل به پیچیدگی عشق و تناقضات آن اشاره دارد.",
            "life_lesson": "در عشق، گاهی تناقضات را باید پذیرفت."
        },
        "ai_opinion": "تأملی در پیچیدگی‌های عشق."
    },
    {
        "poem": "صبا اگر گذری افتدت به کشور دوست\nبیار نفحه‌ای از گیسوی معطر دوست\n\nبه جان او که به شکرانه جان برافشانم\nاگر رسانی ام از او پیام و سر دوست",
        "meaning": "ای نسیم صبح، اگر به کشور معشوق من رسیدی، بوی خوشی از گیسوی معطر او برایم بیاور. به جان او قسم، اگر پیامی از او برایم بیاوری، جانم را فدا خواهم کرد.",
        "concept": {
            "interpretation": "غزل به دلدادگی و ارزش پیغام معشوق اشاره دارد.",
            "life_lesson": "پیغام و یادآوری از عزیزان، ارزشمندتر از هر چیزی است."
        },
        "ai_opinion": "ستایشی از دلدادگی و اهمیت پیغام معشوق."
    },
    {
        "poem": "هرگزم چشم به رویت نرسیدست ای دوست\nچشمم از دیدن رویت چه بریزد ای دوست\n\nگفتم این بار نشینم که نشانش جویم\nبار دیگر چه کنم گر نرسیدست ای دوست",
        "meaning": "هرگز چشمم به روی تو نرسیده است، اما چشمم چه گریه‌ها که برای دیدن تو نکرده است. گفتم این بار می‌نشینم تا نشانی از تو پیدا کنم، اما اگر دوباره هم نتوانم تو را ببینم، چه باید کرد؟",
        "concept": {
            "interpretation": "این غزل به اشتیاق عاشق برای دیدن معشوق و صبوری در انتظار اشاره دارد.",
            "life_lesson": "صبوری در عشق و امید به دیدار را حفظ کن."
        },
        "ai_opinion": "بیانی از اشتیاق و امید در عشق."
    },
    {
        "poem": "چون زلف تو ام جانا در عین پریشانی\nچون باد سحرگاهم در بوی تو می‌مانم\n\nمن خاکم و خواهم شد در پای تو ریزد\nتا عمر دگر باشد در پای تو می‌مانم",
        "meaning": "ای جان من، مانند زلف تو در عین آشفتگی هستم و مانند باد سحرگاهی به دنبال بوی خوش تو می‌گردم. من خاکم و می‌خواهم در پای تو بریزم و حتی در زندگی دیگر نیز در پای تو بمانم.",
        "concept": {
            "interpretation": "این غزل به تعهد عاشق به معشوق و پیوند جاودان اشاره دارد.",
            "life_lesson": "در عشق، تعهد و وفاداری را همواره حفظ کن."
        },
        "ai_opinion": "توصیفی از تعهد و پایداری در عشق."
    },
    {
        "poem": "ای که از کوچه معشوقه ما می‌گذری\nبر حذر باش که سر می‌شکند دیوارش\n\nنیست امید صلاحی ز فساد حافظ\nچون که تقدیر چنین است چه تدبیر کنم",
        "meaning": "ای کسی که از کوچه معشوق من می‌گذری، مراقب باش که دیوار این کوچه، سرشکن است. حافظ می‌گوید که دیگر امیدی به اصلاح خود ندارم، زیرا تقدیر چنین است و چه کاری می‌توانم انجام دهم؟",
        "concept": {
            "interpretation": "این غزل به هشدار به دیگران و پذیرش سرنوشت اشاره دارد.",
            "life_lesson": "تقدیر خود را بپذیر و در برابر سرنوشت تلاش کن."
        },
        "ai_opinion": "بیانی از پذیرش تقدیر و هشدار به دیگران."
    },
    {
        "poem": "سینه از آتش دل در غم جانانه بسوخت\nآتش عشق مگر خامش شد و خانه بسوخت\n\nاز حکایت دل شمع به فریاد آمد\nوز غم آتش دل در غم پروانه بسوخت",
        "meaning": "سینه من از آتش عشق معشوق سوخت و حتی آتش عشق نیز خاموش شد و خانه دل را سوزاند. حتی شمع نیز از حکایت دل من به فریاد آمد و غم پروانه را نیز در آتش خود سوزاند.",
        "concept": {
            "interpretation": "این غزل به شدت عشق و تأثیر آن بر دل عاشق اشاره دارد.",
            "life_lesson": "عشق می‌تواند دردناک باشد، اما زیبایی آن را درک کن."
        },
        "ai_opinion": "شرحی از شدت عشق و تأثیر آن."
    }
]




export const getFalPage = (req: Request, res: Response) => {
    res.render('index', { poem: null, message: null });
};

export const getRandomFal = async (req: Request, res: Response) => {
    try {
        // Log user information
        const userIP = req.ip;
        const userAgent = req.get('User-Agent');
        const currentTime = new Date();

        console.log(`User IP: ${userIP}`);
        console.log(`User Agent: ${userAgent}`);
        console.log(`Time: ${currentTime.toLocaleTimeString()}`);
        console.log(`Date: ${currentTime.toLocaleDateString()}`);

        // If API available, fetch data from API
        // const response = await axios.get('https://hafezapi.example.com/random');
        // const poem = response.data.poem;

        // Fallback to mock dataset
        const poem = poems[Math.floor(Math.random() * poems.length)];
        res.render('index', { poem, message: null });
    } catch (error) {
        res.render('index', { poem: null, message: 'خطایی رخ داده است. لطفا دوباره تلاش کنید.' });
    }
};

