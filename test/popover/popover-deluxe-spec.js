import React from 'react';
import test from 'tape';
import {mount, shallow} from 'enzyme';

import {Popover, Tooltip, POSITIONS} from 'monochrome/popover';

import {
  capitalize,
  getOppositePosition,
  nodeHasParent,
  positionsToPopperPlacement
} from 'monochrome/popover/utils';

function MockPopperClass() {}
MockPopperClass.prototype.destroy = () => {};

class MockPortal extends React.Component {
  render() {
    return this.props.children;
  }
}

test('Popover - hover trigger', t => {
  const content = <p className="content">Content</p>;
  const target = <p className="target">Target</p>;
  const $ = mount(
    <Popover
      position="top"
      arrowPosition="left"
      content={content}
      popperClass={MockPopperClass}
      portalClass={MockPortal}
      trigger="hover"
    >
      {target}
    </Popover>
  );

  t.ok($.exists(), 'component should be rendered');
  t.notOk($.find('.content').exists(), 'content should not be rendered yet');
  t.ok($.find('.target').exists(), 'target should be rendered');

  $.find('.u-popover-target').simulate('mouseenter');
  t.ok($.find('.content').exists(), 'content should now be rendered');

  $.find('.u-popover-target').simulate('mouseleave');
  t.notOk($.find('.content').exists(), 'content should now be hidden');

  t.end();
});

test('Popover - click trigger', t => {
  const content = <p className="content">Content</p>;
  const target = <p className="target">Target</p>;
  const $ = mount(
    <Popover
      position="top"
      arrowPosition="left"
      content={content}
      popperClass={MockPopperClass}
      portalClass={MockPortal}
      trigger="click"
    >
      {target}
    </Popover>
  );

  t.ok($.exists(), 'component should be rendered');
  t.notOk($.find('.content').exists(), 'content should not be rendered yet');
  t.ok($.find('.target').exists(), 'target should be rendered');

  $.find('.u-popover-target').simulate('click');
  t.ok($.find('.content').exists(), 'content should now be rendered');

  $.find('.content').simulate('click');
  t.ok($.find('.content').exists(), 'clicking tooltip content should not hide it');

  $.find('.u-popover-target').simulate('click');
  t.notOk($.find('.content').exists(), 'content should now be hidden');

  t.end();
});

test('Popover - Arrow Styles', t => {
  const $ = shallow(
    <Popover
      position="top"
      arrowPosition="left"
      content={() => <span>Content</span>}
      popperClass={MockPopperClass}
      portalClass={MockPortal}
      trigger="click"
    >
      <span>Target</span>
    </Popover>
  );

  t.deepEqual(
    $.instance()._generateOuterArrowStyles('top'),
    {
      borderColor: '#ddd transparent transparent transparent',
      borderStyle: 'solid',
      borderWidth: '8px 8px 0 8px',
      bottom: '-8px',
      height: 0,
      left: 'calc(50% - 8px)',
      margin: '8px',
      marginBottom: 0,
      marginTop: 0,
      position: 'absolute',
      width: 0
    },
    'Generates correct outer arrow styles'
  );

  t.deepEqual(
    $.instance()._generateOuterArrowStyles('top'),
    {
      borderColor: '#ddd transparent transparent transparent',
      borderStyle: 'solid',
      borderWidth: '8px 8px 0 8px',
      bottom: '-8px',
      height: 0,
      left: 'calc(50% - 8px)',
      margin: '8px',
      marginBottom: 0,
      marginTop: 0,
      position: 'absolute',
      width: 0
    },
    'Generates correct inner arrow styles'
  );

  t.end();
});

test('Tooltip - simple render test', t => {
  const content = <p className="content">Content</p>;
  const target = <p className="target">Target</p>;
  const $ = shallow(
    <Tooltip position="top" arrowPosition="left" content={content}>
      {target}
    </Tooltip>
  );

  const $popover = $.find(Popover);
  t.ok($popover.exists(), 'Should render a popover');
  t.is($popover.prop('trigger'), 'hover', 'Should pass correct trigger prop');
  t.is($popover.prop('bodyStyle').maxWidth, '300px', 'Should pass correct width');

  t.end();
});

test('Utils - getOppositePosition', t => {
  t.is(getOppositePosition(POSITIONS.TOP), POSITIONS.BOTTOM);
  t.is(getOppositePosition(POSITIONS.RIGHT), POSITIONS.LEFT);
  t.is(getOppositePosition(POSITIONS.BOTTOM), POSITIONS.TOP);
  t.is(getOppositePosition(POSITIONS.LEFT), POSITIONS.RIGHT);
  t.is(getOppositePosition(undefined), POSITIONS.BOTTOM);

  t.end();
});

test('Utils - capitalize', t => {
  t.is(capitalize('bottom'), 'Bottom');
  t.end();
});

test('Utils - nodeHasParent', t => {
  /**
   *      A
   *    /  \
   *   B   C
   *  /
   * D
   */
  const nodeA = {id: 'a'};
  const nodeB = {id: 'b'};
  const nodeC = {id: 'c'};
  const nodeD = {id: 'd'};
  nodeD.parentNode = nodeB;
  nodeB.parentNode = nodeA;
  nodeC.parentNode = nodeA;
  nodeA.parentNode = {};

  t.ok(nodeHasParent(nodeD, nodeD), 'Returns true for self references');
  t.ok(nodeHasParent(nodeD, nodeB), 'Returns true for direct parent');
  t.ok(nodeHasParent(nodeD, nodeA), 'Returns true for root');
  t.notOk(nodeHasParent(nodeD, nodeC), 'Returns false for non-parent');
  t.notOk(nodeHasParent(nodeA, nodeC), 'Returns false for child');
  t.end();
});

test('Utils - positionsToPopperPlacement', t => {
  t.is(positionsToPopperPlacement('top', 'right'), 'top-end');
  t.is(positionsToPopperPlacement('top', 'left'), 'top-start');
  t.is(positionsToPopperPlacement('top', 'auto'), 'top');
  t.is(positionsToPopperPlacement('auto', 'auto'), 'auto');
  t.is(positionsToPopperPlacement('bottom', 'left'), 'bottom-start');
  t.is(positionsToPopperPlacement('left', 'top'), 'left-start');
  t.is(positionsToPopperPlacement(), 'auto');
  t.is(positionsToPopperPlacement(null, null), 'auto');
  t.end();
});
