import { KArticle, KHeader, KImage, KText } from "../../components";

export default function WelcomePage() {
  return (
    <KArticle
      header={
        <KHeader
          title="<편집장 인사말>"
          author="제17대 〈KAIST비전〉 편집장 서성재"
          image="/images/23-summer/1-0.jpg"
        />
      }
    >
      <KImage src="/images/23-summer/1-1.jpg" width={200} />
      <KText>
        2년 전, 카이누리 정식대사가 되고 작성한
        {`<KAIST비전>`}의 첫 기사를 읽어보았습니다. 지금 보니 서투름투성이인
        듯합니다. 체감하지 못했는데, 그동안 저도 성장했나 봅니다.
      </KText>
      <KText>
        이번 호는 편집장이자, 학생기자로서 마지막 작품입니다. 그간 기사를
        작성하며 바라본 KAISTian은 꿈을 향해 행동하고 도전하는 사람들입니다.
      </KText>
      <KText>
        이렇게 훌륭한 KAIST 동문을 만나고 그 속에 담긴 이야기 타래를 잘 풀어내어
        독자 여러분께 전달해드릴 수 있어서 영광이었습니다.
      </KText>
      <KText>
        편집장으로서의 {`<KAIST비전>`}은 마지막이더라도, 저 또한 세상에 좋은
        영향을 주는 KAISTian이 되어 이곳에 실리리라 이 글을 빌려 다짐합니다.
        앞으로도 KAIST, 카이누리, 그리고 {`<KAIST비전>`}에 아낌없는 관심과 사랑
        부탁드립니다.
      </KText>
      <KText>마지막으로 이 말을 남기고 떠납니다! Hasta la vista!</KText>
    </KArticle>
  );
}
