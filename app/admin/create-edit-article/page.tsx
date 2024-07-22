"use client";
import {
  Button,
  CircularProgress,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { createClientSupabase } from "../../../utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Volume } from "../../../utils/types";
import { createFileName, createImageUrl } from "../../../utils/utils";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const volumeId = searchParams.get("volumeId");
  const initialIndex = searchParams.get("index") ?? "";

  const [volume, setVolume] = useState<Volume>();

  const [title, setTitle] = useState("");
  const [index, setIndex] = useState(initialIndex);
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<string>();
  const [imageCaption, setImageCaption] = useState<string>("");

  const [body, setBody] = useState<any[]>([]);

  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  const selectFile = useRef<HTMLInputElement>(null);

  const [uploadedFileName, setUploadedFileName] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [imageIndex, setImageIndex] = useState<number>();

  useEffect(() => {
    const supabase = createClientSupabase();
    const fetchVolumes = async () => {
      const { data } = await supabase
        .from("volumes")
        .select("*")
        .eq("id", volumeId)
        .single();
      setVolume(data);
    };
    fetchVolumes();
  }, [volumeId]);

  const onSelectImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsLoading(true);
      if (!e.target.files) {
        return;
      }
      const supabase = createClientSupabase();
      const { data, error } = await supabase.storage
        .from("images")
        .upload(
          `${volumeId}/${createFileName(e.target.files[0].name)}`,
          e.target.files[0],
          {
            upsert: false,
          }
        );
      if (error) {
        console.error(error);
      }
      setUploadedFileName(`/images/${data?.path}` ?? "");
      setIsLoading(false);
    },
    [volumeId]
  );

  return (
    <>
      <div>
        <h2 className="m-4 text-xl">
          {volume?.year}년 {volume?.name}호 기사 작성
        </h2>
        <div className="flex flex-row">
          <Input
            label="기사 번호"
            className="m-4 w-36"
            value={index}
            onValueChange={setIndex}
          />
          <Input
            label="기사 분류"
            className="m-4 w-96"
            placeholder="예) 커버스토리"
            value={category}
            onValueChange={setCategory}
          />
        </div>
        <div className="m-4 text-lg">헤더</div>
        <Input
          label="기사 제목"
          className="m-4 w-3/4"
          value={title}
          onValueChange={setTitle}
        />
        <Input
          label="작성자"
          className="m-4 w-3/4"
          value={author}
          onValueChange={setAuthor}
        />
        <Textarea
          label="캡션"
          className="m-4"
          value={caption}
          onValueChange={setCaption}
        />
        {image ? (
          <>
            <div className="flex flex-row items-center">
              <Button
                className="m-4"
                onClick={() => {
                  setImage(undefined);
                  setImageCaption("");
                }}
              >
                헤더 이미지 제거
              </Button>
              <div>{image}</div>
            </div>
            <Image
              src={createImageUrl(image)}
              alt="Header image"
              className="max-h-96"
            />
            <Input
              className="m-4 w-3/4"
              value={imageCaption}
              onValueChange={setImageCaption}
              label="이미지 캡션"
            />
          </>
        ) : (
          <Button
            className="m-4"
            onClick={() => {
              setImageIndex(-1);
              onOpen();
            }}
          >
            헤더 이미지 업로드
          </Button>
        )}
        <div className="m-4 text-lg">컨텐츠</div>
        {body.map((item, index) => {
          if (item.type === "subtitle") {
            return (
              <div className="m-4" key={index}>
                <div className="flex flex-row items-center">
                  <div>소제목</div>
                  <Button
                    onClick={() => {
                      setBody((body) => {
                        const newBody = [...body];
                        newBody.splice(index, 1);
                        return newBody;
                      });
                    }}
                    variant="light"
                    color="danger"
                  >
                    삭제
                  </Button>
                </div>
                <Input
                  className="w-3/4"
                  value={item.text}
                  onValueChange={(text) => {
                    setBody((body) => {
                      const newBody = [...body];
                      newBody[index].text = text;
                      return newBody;
                    });
                  }}
                />
              </div>
            );
          } else if (item.type === "text") {
            return (
              <div className="m-4" key={index}>
                <div className="flex flex-row items-center">
                  <div>본문</div>
                  <Button
                    onClick={() => {
                      setBody((body) => {
                        const newBody = [...body];
                        newBody.splice(index, 1);
                        return newBody;
                      });
                    }}
                    variant="light"
                    color="danger"
                  >
                    삭제
                  </Button>
                </div>
                <Textarea
                  value={item.text}
                  onValueChange={(text) => {
                    setBody((body) => {
                      const newBody = [...body];
                      newBody[index].text = text;
                      return newBody;
                    });
                  }}
                />
              </div>
            );
          } else if (item.type === "image") {
            return (
              <div className="m-4" key={index}>
                <div className="flex flex-row items-center gap-4">
                  <div>이미지</div>
                  <Button
                    onClick={() => {
                      setBody((body) => {
                        const newBody = [...body];
                        newBody.splice(index, 1);
                        return newBody;
                      });
                    }}
                    variant="light"
                    color="danger"
                  >
                    삭제
                  </Button>
                </div>
                <Button
                  onClick={() => {
                    setImageIndex(index);
                    onOpen();
                  }}
                >
                  이미지 업로드
                </Button>
                <Image
                  src={createImageUrl(item.image)}
                  alt="Article image"
                  className="max-h-96"
                />
                <Input
                  className="w-3/4 my-2"
                  label="캡션"
                  value={item.caption}
                  onValueChange={(caption) => {
                    setBody((body) => {
                      const newBody = [...body];
                      newBody[index].caption = caption;
                      return newBody;
                    });
                  }}
                />
              </div>
            );
          }
        })}
        <div className="row m-4 gap-4">
          <Button
            className="mr-4"
            onClick={() => {
              setBody((body) => [...body, { type: "subtitle", text: "" }]);
            }}
          >
            소제목 추가
          </Button>
          <Button
            className="mr-4"
            onClick={() => {
              setBody((body) => [...body, { type: "text", text: "" }]);
            }}
          >
            본문 추가
          </Button>
          <Button
            className="mr-4"
            onClick={() => {
              setBody((body) => [
                ...body,
                { type: "image", image: "", caption: "" },
              ]);
            }}
          >
            이미지 추가
          </Button>
        </div>
        <div className="flex flex-row">
          <Button
            className="m-4"
            variant="solid"
            color="primary"
            onClick={async () => {
              const supabase = createClientSupabase();
              const { error } = await supabase.from("articles").insert({
                volume_id: volumeId,
                index,
                category,
                header: {
                  title,
                  author,
                  caption,
                  image,
                  imageCaption,
                },
                body,
              });
              if (error) {
                console.log(error);
              } else {
                router.push(`/admin/volumes/${volumeId}`);
                router.refresh();
              }
            }}
          >
            기사 업로드
          </Button>
          <Button
            variant="bordered"
            className="m-4"
            onClick={() => {
              if (
                window.confirm(
                  "정말로 취소하시겠습니까? 기사 작성 내용이 저장되지 않습니다."
                )
              ) {
                router.push(`/admin/volumes/${volumeId}`);
                router.refresh();
                return;
              }
            }}
          >
            취소하기
          </Button>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                이미지 업로드
              </ModalHeader>
              <ModalBody>
                <input
                  type="file"
                  accept="image/*"
                  ref={selectFile}
                  onChange={onSelectImage}
                />
                {isLoading ? <CircularProgress /> : null}
                {uploadedFileName ? (
                  <div>{`업로드 완료: ${uploadedFileName}`}</div>
                ) : null}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  닫기
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    if (imageIndex === -1) {
                      setImage(uploadedFileName ?? "");
                    } else if (imageIndex) {
                      setBody((body) => {
                        const newBody = [...body];
                        newBody[imageIndex].image = uploadedFileName;
                        return newBody;
                      });
                    }
                    setUploadedFileName(undefined);
                    onClose();
                  }}
                >
                  적용하기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
