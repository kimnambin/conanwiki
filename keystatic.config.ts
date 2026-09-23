import {collection, config, fields} from '@keystatic/core';

export default config({
  storage:
    process.env.NODE_ENV === 'development'
      ? {kind: 'local'}
      : {
          kind: 'github',
          repo: {owner: 'kimnambin', name: 'conanwiki'},
        },
  ui: {
    brand: {name: '코난 위키 어드민'},
  },
  collections: {
    characters: collection({
      label: '캐릭터',
      slugField: 'englishName',
      path: 'src/content/characters/*',
      format: {data: 'json'},
      schema: {
        englishName: fields.slug({name: {label: '영어 이름 (슬러그)'}}),
        age: fields.text({label: '나이 (숫자 또는 문자, 예: 17 / 미상)'}),
        aliases: fields.text({label: '별명 (HTML 가능)', multiline: true}),
        date_of_birth: fields.text({label: '생년월일'}),
        drama_actor: fields.text({label: '드라마 배우'}),
        first_appearance: fields.object(
          {
            anime: fields.text({label: '애니메이션'}),
            manga: fields.text({label: '만화'}),
          },
          {label: '첫 등장'},
        ),
        gender: fields.text({label: '성별'}),
        keyhole: fields.integer({
          label: '키홀 번호',
          validation: {isRequired: false},
        }),
        name: fields.object(
          {
            english: fields.object(
              {
                anime: fields.text({label: '애니'}),
                manga: fields.text({label: '만화'}),
              },
              {label: '영어'},
            ),
            japanese: fields.object(
              {
                kanji: fields.text({label: '한자'}),
                romanized: fields.text({label: '로마자'}),
              },
              {label: '일본어'},
            ),
            korean: fields.object(
              {
                name: fields.text({label: '한국어 이름'}),
              },
              {label: '한국어'},
            ),
          },
          {label: '이름'},
        ),
        img: fields.text({label: '이미지 경로'}),
        occupation: fields.text({label: '직업', multiline: true}),
        affiliation: fields.array(fields.text({label: '소속'}), {
          label: '소속 목록',
          itemLabel: props => props.value,
        }),
        status: fields.text({label: '생존 상태 (생존 / 사망 / 미상)'}),
        relationships: fields.object(
          {
            가족: fields.array(fields.text({label: '이름'}), {
              label: '가족',
              itemLabel: props => props.value,
            }),
            연인: fields.array(fields.text({label: '이름'}), {
              label: '연인',
              itemLabel: props => props.value,
            }),
            친구: fields.array(fields.text({label: '이름'}), {
              label: '친구',
              itemLabel: props => props.value,
            }),
            동료: fields.array(fields.text({label: '이름'}), {
              label: '동료',
              itemLabel: props => props.value,
            }),
            적: fields.array(fields.text({label: '이름'}), {
              label: '적',
              itemLabel: props => props.value,
            }),
          },
          {label: '관계'},
        ),
        voice: fields.array(
          fields.object(
            {
              japanese: fields.text({label: '일본어 성우', multiline: true}),
              korean: fields.text({label: '한국어 성우', multiline: true}),
            },
            {label: '성우'},
          ),
          {
            label: '성우 목록',
            itemLabel: props => props.fields.japanese.value || '성우',
          },
        ),
        namuwikiUrl: fields.text({
          label: '나무위키 URL',
          validation: {isRequired: false},
        }),
      },
    }),

    couples: collection({
      label: '커플',
      slugField: 'couple_nickname',
      path: 'src/content/couples/*',
      format: {data: 'json'},
      schema: {
        couple_nickname: fields.slug({name: {label: '커플 닉네임'}}),
        man: fields.text({label: '남성 이름'}),
        man_url: fields.text({label: '남성 이미지 경로'}),
        man_job: fields.text({
          label: '남성 직업',
          validation: {isRequired: false},
        }),
        women: fields.text({label: '여성 이름'}),
        women_url: fields.text({label: '여성 이미지 경로'}),
        women_job: fields.text({
          label: '여성 직업',
          validation: {isRequired: false},
        }),
        couple_url: fields.text({
          label: '커플 이미지 경로',
          validation: {isRequired: false},
        }),
        status: fields.text({label: '상태 (미혼 / 기혼 등)'}),
        relationship_type: fields.text({label: '관계 유형'}),
        description: fields.text({label: '설명', multiline: true}),
        episodes: fields.array(
          fields.object(
            {
              title: fields.text({label: '제목'}),
              source: fields.text({label: '출처'}),
              description: fields.text({label: '설명', multiline: true}),
            },
            {label: '에피소드'},
          ),
          {
            label: '관련 에피소드',
            itemLabel: props => props.fields.title.value,
          },
        ),
        movies: fields.array(
          fields.object(
            {
              number: fields.text({label: '번호'}),
              title: fields.text({label: '제목'}),
              note: fields.text({label: '비고', multiline: true}),
            },
            {label: '영화'},
          ),
          {
            label: '관련 영화',
            itemLabel: props => props.fields.title.value,
          },
        ),
      },
    }),
  },
});
