# Problems with Broadway Roles
...manifesting in the author index

## Terms
On the author index page, `/authors`, the main components are *sidebar* and *body*.
In the body  we display *cards* for each *author* marked in the corpus.
Currently, these can be filtered by *role*: [ *contributor*,
*mentioned*, *editor*, *correspondent* ].

Authors included in the index had to either *contribute* a piece to the Broadway Journal (BWJ), or they had to have been *mentioned* in a piece contributed to the BWJ by someone else.

The author roles come from the [personography data](https://github.com/lsulibraries/broadway-tei/blob/master/personography.xml),
where project staff have assigned one or more of them to each author.

Clicking any card in the body causes the sidebar to display detail for the selected author.
This detail is partitioned into two sections: summary information (bio, role icons)
at the top, and a list of pieces related to the author.

## The Problem

We have discussed the idea of indicating author role for each of the pieces listed in the author detail section. This is problematic because the four roles in use are not all appropriate in describing the relationship between author and piece.

## Intersecting sets

The superset of roles `[ editor, correspondent, contributor, mentioned ]` is composed of two intersecting subsets.

`[ editor, correspondent ]` is derived from the text ("letter from...", or "Editor: C.F. Briggs") and describes the author's relationship with the journal, while `[ contributor, mentioned ]` describes the relationship between author and piece ("mentioned in", "author of").

Contributing a piece or being mentioned in one constitutes a relationship to the journal, making the set of such relationships `[ editor, correspondent, contributor, mentioned ]`. However, that set does not work well to describe the relationship of author to piece.

The author's relationship with any given piece can only be one of three possibilities:
`[ unrelated (no relationship), mentioned in, author of ]`, but we are only concerned with pieces related to the an author. The subset of journal relationships `[ contributor, mentioned ]` works well to describe author-piece relationships, but is ambiguous unless the role name is qualified by context `[ journal, piece ]`.

### Tests

Poe was an editor who contributed much of the content and who was sometimes
mentioned. What role icon do we show in the sidebar for *The Raven* ?

The sidebar listing of pieces is meant to depict the author's relationship to the piece,
and not to the journal. For *The Raven*, a piece that Poe contributed,

Considering the personography data, the author's relationship with any given piece can be only one of
three possibilities: [ unrelated (no relationship), mentioned in, author of ].


### Proposal
The vocabulary could be augmented to reflect context (mentioned in, author of in the piece context).
