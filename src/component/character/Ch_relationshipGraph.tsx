'use client';

import {useMemo} from 'react';
import {CharacherType} from '../../types/api.model';
import {
  buildRelationshipEntries,
  layoutRelationshipNodes,
  RELATIONSHIP_CATEGORIES,
  RelationshipNode,
} from '../../utils/relationshipGraph';

interface Ch_relationshipGraphProps {
  character: CharacherType;
  characters: CharacherType[];
  onSelect: (character: CharacherType) => void;
}

const CENTER_SIZE = 56;
const NODE_SIZE = 36;

function NodeAvatar({
  node,
  size,
  onSelect,
}: {
  node: RelationshipNode;
  size: number;
  onSelect: (character: CharacherType) => void;
}) {
  const clickable = Boolean(node.matched);
  const tooltip = node.note ? `${node.name} (${node.note})` : node.name;

  return (
    <button
      type="button"
      className={`relationship-graph__node${
        clickable ? '' : ' relationship-graph__node--unmatched'
      }`}
      style={
        {
          left: node.x,
          top: node.y,
          width: size,
          height: size,
          '--node-color': RELATIONSHIP_CATEGORIES.find(
            c => c.key === node.category,
          )?.color,
        } as React.CSSProperties
      }
      title={tooltip}
      disabled={!clickable}
      onClick={() => node.matched && onSelect(node.matched)}>
      {node.matched ? (
        <span
          className="relationship-graph__node-img"
          style={{backgroundImage: `url("${node.matched.img}")`}}
        />
      ) : (
        <span className="relationship-graph__node-fallback">?</span>
      )}
    </button>
  );
}

// 캐릭터의 relationships 데이터를 방사형(radial) 관계도로 시각화한다.
// 노드를 클릭하면 매칭된 캐릭터로 상세 카드를 갈아끼운다.
export default function Ch_relationshipGraph({
  character,
  characters,
  onSelect,
}: Ch_relationshipGraphProps) {
  const entries = useMemo(
    () => buildRelationshipEntries(character, characters),
    [character, characters],
  );
  const layout = useMemo(() => layoutRelationshipNodes(entries), [entries]);

  if (entries.length === 0) return null;

  const activeCategories = RELATIONSHIP_CATEGORIES.filter(cat =>
    entries.some(entry => entry.category === cat.key),
  );

  return (
    <div className="hs-card__section">
      <div className="hs-card__section-title">관계도</div>
      <div className="relationship-graph__legend">
        {activeCategories.map(cat => (
          <span key={cat.key} className="relationship-graph__legend-item">
            <span
              className="relationship-graph__legend-dot"
              style={{backgroundColor: cat.color}}
            />
            {cat.icon} {cat.label}
          </span>
        ))}
      </div>
      <div
        className="relationship-graph"
        style={{width: layout.width, height: layout.height}}>
        <svg
          className="relationship-graph__edges"
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          aria-hidden="true">
          {layout.nodes.map(node => {
            const color = RELATIONSHIP_CATEGORIES.find(
              c => c.key === node.category,
            )?.color;
            return (
              <line
                key={node.id}
                x1={layout.centerX}
                y1={layout.centerY}
                x2={node.x}
                y2={node.y}
                stroke={color}
                strokeOpacity={0.45}
                strokeWidth={1.5}
              />
            );
          })}
        </svg>

        <span
          className="relationship-graph__node relationship-graph__node--center"
          style={{
            left: layout.centerX,
            top: layout.centerY,
            width: CENTER_SIZE,
            height: CENTER_SIZE,
          }}
          title={character.name.korean.name}>
          <span
            className="relationship-graph__node-img"
            style={{backgroundImage: `url("${character.img}")`}}
          />
        </span>

        {layout.nodes.map(node => (
          <NodeAvatar
            key={node.id}
            node={node}
            size={NODE_SIZE}
            onSelect={onSelect}
          />
        ))}
      </div>
      <p className="relationship-graph__hint">
        위키에 등록된 캐릭터는 클릭해서 바로 이동할 수 있어요.
      </p>
    </div>
  );
}
