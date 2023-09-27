const axios = require("axios");
const cheerio = require("cheerio");

const getHTML = async (keyword) => {
  try {
    const html = (await axios.get(`https://${encodeURI(keyword)}`)).data;
    return html;
  } catch (e) {
    console.log(e);
  }
}

const parsing = async (page) => {
  const $ = cheerio.load(page);
  const titles = [];
  const $titleList = $(".article-content");

  $titleList.each((idx, node) => {
    const blog_Title = $(node).find(".title:eq(0)").text();
    const summation = $(node).find("p.summary:eq(0)").text().slice(0, 100);
    const blog_Date = $(node).find(".date:eq(0)").text();
    const blog_Link = `https://sunalog.tistory.com${$(node).find("a.link-article:eq(0)").attr("href")};`

    titles.push({
      blog_Title, summation, blog_Date, blog_Link
    })
  });

  return titles;
}

const getTitles = async (keyword) => {
  const html = await getHTML(keyword);
  const titles = await parsing(html);
  console.log(titles);
  return titles;
};

const getFullContent = async () => {
  let titles = [];
  let i = 1;
  while (i <= 3) {
    let titles = await getTitles(`sunalog.tistory.com/?page=${i}`);
    titles = titles.concat(titles);
    i++;
  }
};

getFullContent();

//선아 sunalog
//태영 chlxodud

/*
제목 정보 $("strong.title")text
<strong class="title">[프로그래머스]문자열 정렬하기 (1)<img src="https://tistory1.daumcdn.net/tistory_admin/blogs/image/category/new_ico_5.gif" style="vertical-align:middle; padding-left:5px; width:10px; height:10px;"></strong>

요약
<p class="summary">나의풀이 function solution(my_string) { var answer = my_string.split('').map(Number).filter(fs=&gt;!isNaN(fs)).sort((a,b) =&gt; a-b) return answer } my_string.split('') 입력값 〉 "hi12392" 실행 결과 〉 실행한 결괏값 ["h","i","1","2","3","9","2"] my_string.split('').map(Number) 입력값 〉 "hi12392" 실행 결과 〉 실행한 결괏값 [null,null,1,2,3,9,2] my_string.split('').map(Number).filter(fs=&gt;!isNan(fs)) 입력값 〉 "hi12392" 실행 결과 〉 실행한 결괏값 [1,2..</p>

날짜
<span class="date">13:13:28</span>

링크
<a href="/26" class="link-article"></a>
*/